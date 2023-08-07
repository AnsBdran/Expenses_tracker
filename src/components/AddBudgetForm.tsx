import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AddBudgetFormValuesType } from '../utils/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDispatch } from 'react-redux';
import { budgetAdded } from '../features/budgets/budgetsSlice';
import { indigo } from '@mui/material/colors';

const AddBudgetForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState, reset } =
    useForm<AddBudgetFormValuesType>({});
  const { isSubmitting, errors, isDirty, isValid } = formState;
  const onSubmit = (formValues: AddBudgetFormValuesType) => {
    dispatch(budgetAdded(formValues));
    reset();
  };
  return (
    <Paper elevation={8} sx={{ mt: 2, p: 2, flexGrow: 1, bgcolor: indigo[50] }}>
      {/* <Box
        component='section'
        sx={{ p: 1, border: '3px dashed', borderColor: 'primary.light' }}
      > */}
      <Typography variant='h4' gutterBottom>
        Create a budget
      </Typography>

      <Stack
        spacing={3}
        mt={2}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          size='small'
          {...register('name', {
            required: 'Enter a name for the budget.',
          })}
          label='Budget name'
          placeholder='Groceries'
          helperText={errors.name?.message}
          error={!!errors.name}
        />
        <TextField
          size='small'
          {...register('amount', {
            valueAsNumber: true,
            required: 'Required',
          })}
          label='Budget Amount'
          placeholder='e.g. 250'
          type='number'
          helperText={errors.amount?.message}
          error={!!errors.amount}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AttachMoneyIcon />
              </InputAdornment>
            ),
            inputMode: 'decimal',
          }}
          inputProps={{
            step: 0.01,
          }}
        />
        <Button
          variant='contained'
          type='submit'
          endIcon={<AddCircleOutlineIcon />}
          disabled={isSubmitting || !isValid || !isDirty}
          sx={{ alignSelf: 'center' }}
        >
          add budget
        </Button>
      </Stack>
      {/* </Box> */}
    </Paper>
  );
};

export default AddBudgetForm;
