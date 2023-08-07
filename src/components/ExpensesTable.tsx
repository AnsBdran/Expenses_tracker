import { useMemo, useState } from 'react';
import { ExpenseType } from '../utils/types';
import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { COLUMNS } from '../utils/helpers';
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
// icons imports
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditExpenseForm from './EditExpenseForm';
import { grey, indigo } from '@mui/material/colors';
type ExpensesTablePropsType = {
  expenses: ExpenseType[];
  columns: any;
};

// component starts from here ===============
// ==========================================
const ExpensesTable = ({
  expenses,
  columns: COLUMNS,
}: ExpensesTablePropsType) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filtering, setFiltering] = useState('');
  const [openEditExpenseForm, setOpenEditExpenseForm] = useState(false);
  const [editRowId, setEditRowId] = useState<string | null>(null);

  // useMemo hook declarations ==========
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => expenses, [expenses]);
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // useTable hook =========
  const {
    getRowModel,
    getHeaderGroups,
    nextPage,
    previousPage,
    getPageCount,
    getState,
    getCanNextPage,
    getCanPreviousPage,
  } = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: filtering,
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    onGlobalFilterChange: setFiltering,
  });

  // function handlers
  const handleEditButtonClick = (row) => {
    setOpenEditExpenseForm(true);
    setEditRowId(() => row.getAllCells()[0].getValue());
  };

  const handleCancelEditExpense = () => {
    setOpenEditExpenseForm(false);
    setEditRowId(null);
  };
  return (
    <>
      <Box sx={{ my: 8 }}>
        <Typography variant='h2' gutterBottom>
          Expenses table
        </Typography>
        <TableContainer
          sx={{
            borderRight: '1px solid',
            borderLeft: '1px solid',
            borderColor: grey[200],
          }}
        >
          <Table size='small' sx={{ whiteSpace: 'nowrap' }}>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <TableHead
                  key={headerGroup.id}
                  sx={{ bgcolor: indigo[800], color: indigo[50] }}
                >
                  <TableRow>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableCell
                          key={header.id}
                          sx={{
                            color: indigo[50],
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      sx={{
                        color: indigo[50],
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
              );
            })}
            <TableBody>
              {getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      ':nth-child(even)': {
                        backgroundColor: indigo[50],
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Tooltip
                        title='Edit'
                        placement='top-start'
                        TransitionComponent={Zoom}
                        arrow
                      >
                        <IconButton onClick={() => handleEditButtonClick(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title='Delete'
                        placement='top-start'
                        arrow
                        TransitionComponent={Zoom}
                      >
                        <IconButton onClick={() => {}}>
                          <DeleteIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          justifyContent='space-between'
          direction='row-reverse'
          alignItems='center'
          spacing={4}
          py={1}
        >
          <Stack direction='row-reverse' alignItems='center'>
            <ButtonGroup>
              <IconButton
                onClick={previousPage}
                disabled={!getCanPreviousPage()}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton onClick={nextPage} disabled={!getCanNextPage()}>
                <ArrowForwardIosIcon />
              </IconButton>
            </ButtonGroup>
            <Typography>
              Page {getState().pagination.pageIndex + 1} of {getPageCount()}
            </Typography>
          </Stack>
          <TextField
            size='small'
            label='Filter'
            variant='standard'
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </Stack>
      </Box>
      {editRowId && (
        <EditExpenseForm
          open={openEditExpenseForm}
          onClose={handleCancelEditExpense}
          rowId={editRowId}
        />
      )}
    </>
  );
};

export default ExpensesTable;
