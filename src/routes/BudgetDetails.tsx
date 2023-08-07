import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import { BudgetType, ExpenseType } from '../utils/types';
import BudgetCard from '../components/BudgetCard';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import { filterExpensesByBudget, getColumns } from '../utils/helpers';
import { Box, Stack, Typography } from '@mui/material';

const BudgetDetails = () => {
  const { id } = useParams();

  const budgets: BudgetType[] = useSelector<RootState>(
    (state) => state.budgets.budgets
  ) as BudgetType[];

  const budget = budgets.find(
    (budget: BudgetType) => budget.id === id
  ) as BudgetType;

  const filteredExpenses = useSelector<RootState>((state) =>
    state.expenses.expenses.filter((expense) => expense.budget.id === budget.id)
  ) as ExpenseType[];
  const columns = getColumns();
  // const filteredExpenses = filterExpensesByBudget(budget.id);

  return (
    <Box>
      <Typography variant='h1'>{budget.name} Budget</Typography>
      <Stack
        spacing={4}
        py={4}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
      >
        <BudgetCard budget={budget} showDeleteButton />
        <AddExpenseForm />
      </Stack>
      {!!filteredExpenses.length && (
        <ExpensesTable expenses={filteredExpenses} columns={columns} />
      )}
    </Box>
  );
};

export default BudgetDetails;
