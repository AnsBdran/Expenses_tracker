import { Box, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import AddBudgetForm from '../components/AddBudgetForm';
import BudgetCard from '../components/BudgetCard';
import AddExpenseForm from '../components/AddExpenseForm';
import { BudgetType, ExpenseType } from '../utils/types';
import ExpensesTable from '../components/ExpensesTable';
import { getColumns } from '../utils/helpers';
import { Budgeting } from '../utils/svgs';
// import EditExpenseForm from '../components/EditExpenseForm';
// import { COLUMNS } from '../utils/helpers';

const Dashboard = () => {
  // useSelector hook
  const userName = useSelector<RootState>((state) => state.user.name) as string;
  const budgets = useSelector<RootState>(
    (state) => state.budgets.budgets
  ) as BudgetType[];
  const expenses = useSelector<RootState>(
    (state) => state.expenses.expenses
  ) as ExpenseType[];

  const columns = getColumns('showBudget');
  return (
    <Box>
      <Typography variant='h2' component='h1' gutterBottom>
        Welcome Home,{' '}
        <Typography
          variant='h2'
          component='span'
          color='primary.main'
          textTransform='capitalize'
          fontWeight='semibold'
        >
          {userName}
        </Typography>
      </Typography>
      <Stack
        gap={4}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <AddBudgetForm />
        {!!budgets.length && <AddExpenseForm />}
        {!budgets.length && (
          <Box style={{ flexGrow: 1, flexBasis: '40%' }}>
            <Budgeting />
          </Box>
        )}
      </Stack>
      {!!budgets.length && (
        <>
          <Typography variant='h2' mt={4} gutterBottom>
            Budgets
          </Typography>
          <Stack
            gap={2}
            direction='row'
            flexWrap='wrap'
            justifyContent='center'
          >
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </Stack>
        </>
      )}
      {!!expenses.length && (
        <ExpensesTable expenses={expenses} columns={columns} />
      )}
    </Box>
  );
};

export default Dashboard;
