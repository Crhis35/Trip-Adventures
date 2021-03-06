import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../../utils/types/user';

export interface UserState {
  user: User | null | undefined;
  jwt: string | undefined | null;
}

interface BaseState {
  currentUser: UserState;
}

export const initialState: BaseState = {
  currentUser: {
    user: undefined || null,
    jwt: undefined || null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.currentUser = action.payload;
    },
    removeUser(state) {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
