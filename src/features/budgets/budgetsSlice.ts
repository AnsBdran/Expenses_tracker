import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BudgetDispatchedActionType, BudgetType } from '../../utils/types';
import { nanoid } from 'nanoid';
import { addToDB, getFromDB, removeFromDB } from '../../utils/helpers';

type InitialStateType = {
  budgets: BudgetType[];
};

const prevBudgets = getFromDB('budgets') || [];

const initialState: InitialStateType = {
  budgets: prevBudgets,
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    budgetAdded: {
      reducer(state, action: PayloadAction<BudgetType>) {
        state.budgets.push(action.payload);
        addToDB('budgets', state.budgets);
      },
      prepare(payload: BudgetDispatchedActionType) {
        return {
          payload: {
            ...payload,
            id: nanoid(),
            createdAt: new Date().getTime(),
          },
        };
      },
    },
    clearBudgets: (state) => {
      state.budgets = [];
      removeFromDB('expenses');
    },
  },
  extraReducers: (builder) => {
    builder.addCase('user/signOut', (state) => {
      state.budgets = [];
    });
  },
});

export default budgetsSlice.reducer;
export const { budgetAdded, clearBudgets } = budgetsSlice.actions;
