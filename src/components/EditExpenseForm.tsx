import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { findExpenseByID, getFromDB } from '../utils/helpers';
import { BudgetType } from '../utils/types';
// import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useForm } from 'react-hook-form';
import { expenseUpdated } from '../features/expenses/expensesSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
type EditExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  rowId: null | string;
};

const EditExpenseForm = ({ open, onClose, rowId }: EditExpenseFormProps) => {
  const dispatch = useDispatch();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const expense = findExpenseByID(rowId);
  const budgets = getFromDB('budgets');

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      id: expense?.id,
      name: expense?.name,
      amount: expense?.amount,
      budget: JSON.stringify(expense?.budget),
      createdAt: expense?.createdAt,
    },
  });

  const onSubmit = (formValues) => {
    console.log('form submitted');
    if (isDirty) {
      dispatch(expenseUpdated(formValues));
      setShowSuccessMsg(true);
    }
    onClose();
  };

  return (
    <>
      {/* <Box
        sx={{ pb: 1, px: 2 }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      > */}
      <Dialog
        open={open}
        onClose={onClose}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Edit expense</DialogTitle>
        <DialogContent sx={{ pb: 1, px: 2 }}>
          <Stack spacing={2} py={1}>
            <TextField
              {...register('id')}
              size='small'
              label='ID'
              InputProps={{ readOnly: true }}
            />
            <TextField {...register('name')} size='small' label='Name' />
            <TextField
              {...register('amount', {
                valueAsNumber: true,
              })}
              size='small'
              label='Amount'
              type='number'
              InputProps={{
                startAdornment: <AttachMoneyIcon />,
              }}
            />
            <TextField
              size='small'
              label='Budget Category'
              select
              {...register('budget')}
              defaultValue={JSON.stringify(expense?.budget)}
            >
              {budgets.map((budget: BudgetType) => (
                <MenuItem
                  key={budget.id}
                  value={JSON.stringify({
                    name: budget.name,
                    id: budget.id,
                  })}
                >
                  {budget.name}
                </MenuItem>
              ))}
            </TextField>
            <input type='hidden' {...register('createdAt')} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' disabled={!isDirty}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSuccessMsg}
        autoHideDuration={2500}
        onClose={() => setShowSuccessMsg(false)}
      >
        <Alert>Expense Edited successfully</Alert>
      </Snackbar>
    </>
  );
};

export default EditExpenseForm;
