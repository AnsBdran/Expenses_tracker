import { createSlice } from '@reduxjs/toolkit';
import { addToDB, getFromDB, removeFromDB } from '../../utils/helpers';

type InitialStateType = {
  name: string;
};

const userName = getFromDB('userName');

const initialState: InitialStateType = {
  name: userName ? userName : 'aa',
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
      console.log('sign out', state.name);
      removeFromDB('userName');
      state.name = '';
      console.log('sign out', state.name);
    },
  },
});

export default userSlice.reducer;
export const { signIn, signOut } = userSlice.actions;
