import { createSlice } from '@reduxjs/toolkit';
import { addToDB, clearDB, getFromDB, removeFromDB } from '../../utils/helpers';

type InitialStateType = {
  name: string;
};

const userName = getFromDB('userName');

const initialState: InitialStateType = {
  name: userName ? userName : '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.name = action.payload;
      addToDB('userName', action.payload);
    },
    signOut: (state) => {
      // removeFromDB('userName');
      state.name = '';
      clearDB();
    },
  },
});

export default userSlice.reducer;
export const { signIn, signOut } = userSlice.actions;
