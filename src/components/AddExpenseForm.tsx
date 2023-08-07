import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AddExpenseFormValuesType, BudgetType } from '../utils/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { expenseAdded } from '../features/expenses/expensesSlice';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { grey, indigo } from '@mui/material/colors';

const AddExpenseForm = () => {
  // hooks call
  const budgets = useSelector<RootState>(
    (state) => state.budgets.budgets
  ) as BudgetType[];

  const {
    register,
    formState: { isDirty, isValid, isLoading },
    handleSubmit,
    reset,
  } = useForm<AddExpenseFormValuesType>();

  const dispatch = useDispatch();

  // function declarations
  const onSubmit = (formValues: AddExpenseFormValuesType) => {
    dispatch(expenseAdded(formValues));
    reset();
  };

  return (
    <Paper sx={{ p: 2, flexGrow: 1, bgcolor: grey[100] }} elevation={8}>
      {/* <Box sx={{ border: '3px dashed', borderColor: 'primary.light', p: 1 }}> */}
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3}>
        <Typography variant='h4'>Add a new expense</Typography>
        <TextField
          size='small'
          {...register('name', {
            required: 'Required field',
          })}
          label='Expense name'
        />
        <TextField
          size='small'
          type='number'
          inputProps={{
            step: 0.01,
          }}
          {...register('amount', {
            valueAsNumber: true,
            required: 'Required field',
          })}
          label='Expense amount'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          size='small'
          label='Budget category'
          select
          defaultValue={JSON.stringify({
            name: budgets[0].name,
            id: budgets[0].id,
          })}
          {...register('budget')}
        >
          {budgets.map((budget) => (
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
        <Button
          variant='contained'
          type='submit'
          endIcon={<AddCircleOutlineIcon />}
          sx={{ alignSelf: 'center' }}
          disabled={isLoading || !isValid || !isDirty}
        >
          Add expense
        </Button>
      </Stack>
      {/* </Box> */}
    </Paper>
  );
};

export default AddExpenseForm;
