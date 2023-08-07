import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddExpenseFormValuesType, ExpenseType } from '../../utils/types';
import {
  addToDB,
  getFromDB,
  prepareExpensePayload,
  removeFromDB,
} from '../../utils/helpers';
import { nanoid } from 'nanoid';

type InitialStateType = {
  expenses: ExpenseType[];
};

const prevExpenses = getFromDB('expenses') || [];

const initialState: InitialStateType = {
  expenses: prevExpenses,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    expenseAdded: {
      prepare(submittedFormValues: AddExpenseFormValuesType) {
        const payload = prepareExpensePayload(submittedFormValues);
        return {
          payload,
        };
      },
      reducer(state, action: PayloadAction<ExpenseType>) {
        console.log('expense added reducer');
        state.expenses.push(action.payload);
        addToDB('expenses', state.expenses);
      },
    },
    expenseUpdated(state, action) {
      console.log('action payload update', action.payload);
      const newExpenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return prepareExpensePayload(action.payload, true);
        }
        return expense;
      });
      console.log('action updated', newExpenses);
      state.expenses = newExpenses;
      addToDB('expenses', newExpenses);
    },
    clearExpenses: (state) => {
      state.expenses = [];
      removeFromDB('expenses');
    },
  },
  extraReducers: (builder) => {
    builder.addCase('user/signOut', (state, action) => {
      state.expenses = [];
    });
  },
});

export default expensesSlice.reducer;
export const { expenseAdded, expenseUpdated, clearExpenses } =
  expensesSlice.actions;
