import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AddBudgetFormType } from '../utils/types';
import AddIcon from '@mui/icons-material/Add';

const AddBudgetForm = () => {
  const { register } = useForm<AddBudgetFormType>({
    defaultValues: {},
  });
  return (
    <Paper elevation={8} sx={{ mt: 2 }}>
      <Box component='section' sx={{ px: 2, py: 2 }}>
        <Typography variant='h2'>Add a new budget</Typography>
        <Stack spacing={3} mt={2}>
          <TextField
            size='small'
            {...register('budgetName')}
            label='budget name'
          />
          <TextField
            size='small'
            {...register('budgetAmount')}
            label='Budget Amount'
          />
          <Button variant='contained' endIcon={<AddIcon />}>
            add budget
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddBudgetForm;
