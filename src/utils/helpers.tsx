import { format } from 'date-fns';
import {
  BudgetType,
  ExpenseType,
  addToDBType,
  removeFromDBType,
} from './types';
import { nanoid } from 'nanoid';

export const addToDB: addToDBType = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromDB: removeFromDBType = (key) => {
  localStorage.removeItem(key);
};

export const getFromDB = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const clearDB = () => {
  localStorage.clear();
};

export const formatDateFromSeconds = (value: string | number) => {
  if (typeof value === 'string') value = JSON.parse(value);
  return format(value as number, 'yyyy-MM-dd HH:mm:ss');
};

export const getBudgetById = (budgets: BudgetType[], budgetId: string) => {
  return budgets.find((budget) => budget.id === budgetId);
};

export const prepareExpensePayload = (payload, updated?: boolean) => {
  if (updated)
    return {
      ...payload,
      budget: JSON.parse(payload.budget),
      createdAt: payload.createdAt,
    };
  return {
    ...payload,
    budget: JSON.parse(payload.budget),
    id: nanoid(),
    createdAt: new Date().getTime(),
  };
};

// export const prepareExpense;

export const getColumns = (showBudgetColumn?: string) => {
  const columnsArr = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (info) => {
        return formatDateFromSeconds(info.getValue());
      },
    },
  ];
  if (showBudgetColumn) {
    columnsArr.splice(2, 0, {
      header: 'Budget',
      accessorKey: 'budget',
      cell: (info) => {
        return info.getValue().name;
      },
    });
    return columnsArr;
  }
  return columnsArr;
};

// find expense by ID
export const findExpenseByID = (id: string | null) => {
  const expenses = getFromDB('expenses');
  return expenses.find((expense: ExpenseType) => expense.id === id);
};

export const findBudgetByID = (id: string) => {
  const budgets: BudgetType[] = getFromDB('budgets');
  return budgets.find((budget) => budget.id === id);
};

export const filterExpensesByBudget = (id: string) => {
  const expenses: ExpenseType[] = getFromDB('expenses');
  return expenses ? expenses.filter((expense) => expense.budget.id === id) : [];
};

export const calcBudgetTotalExpenses = (budgetId) => {
  // const budget = findBudgetByID(budgetId);
  const expenses: ExpenseType[] = getFromDB('expenses');
  return expenses
    ? expenses.reduce((acc, curr) => {
        if (curr.budget.id === budgetId) {
          return curr.amount + acc;
        }
        return acc;
      }, 0)
    : 0;
};
