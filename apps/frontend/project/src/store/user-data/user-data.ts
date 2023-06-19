import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserState } from '../../types/state';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.user = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setToDefault: () => {
    },
  },
});


export const { setAuthorizationStatus, setUser, setToDefault } = userData.actions;
