import { createSlice } from '@reduxjs/toolkit';
import { BudgetType } from '../../utils/types';

type InitialStateType = {
  budgets: BudgetType[];
};

const initialState: InitialStateType = {
  budgets: [],
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    added: (state) => {},
  },
});

export default budgetsSlice.reducer;

export const budgetActions = budgetsSlice.actions;
