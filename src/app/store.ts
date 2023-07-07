import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import budgetsReducer from '../features/budgets/budgetsSlice';
import expensesReducer from '../features/expenses/expensesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    budgets: budgetsReducer,
    expenses: expensesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
