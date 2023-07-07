import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import AddBudgetForm from './AddBudgetForm';

const Dashboard = () => {
  const userName = useSelector<RootState>((state) => state.user.name);
  return (
    <Box px={2} py={2}>
      <section>
        <Typography variant='h2'>Welcome Home, {userName}</Typography>
        <AddBudgetForm />
      </section>
    </Box>
  );
};

export default Dashboard;
