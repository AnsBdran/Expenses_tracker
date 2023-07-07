import { createSlice } from '@reduxjs/toolkit';
import { ExpenseType } from '../../utils/types';

type InitialStateType = {
  expenses: ExpenseType[];
};
const initialState: InitialStateType = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    added: (state) => {},
  },
});

export default expensesSlice.reducer;
export const expensesActions = expensesSlice.actions;
