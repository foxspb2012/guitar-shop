import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { setUser, setAuthorizationStatus } from './user-data/user-data';
import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { Token } from '../types/token';
import {
  APIRoute, AuthorizationStatus,
  NameSpace,
} from '../const';
import { saveToken } from '../services/token';
import { NewUser } from '../types/new-user';
import CreateUserWithIdDto from '../dto/user/create-user-with-id.dto';

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, AsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const {
        data: { token },
      } = await api.post<{ token: Token }>(APIRoute.Login, authData);
      saveToken(token);
      dispatch(checkAuth());
    } catch {
      toast.error('Can\'t login');
    }
  }
);

export const registerUser = createAsyncThunk<void, NewUser, AsyncThunkConfig>(
  `${NameSpace.User}/register`,
  async (userData, { extra: api }) => {
    try {
      await api.post<CreateUserWithIdDto>(APIRoute.Register, userData);
    } catch {
      throw new Error('Can\'t sign up');
    }
  }
);
