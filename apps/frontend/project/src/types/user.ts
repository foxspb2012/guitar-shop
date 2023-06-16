import { Token } from './token';

export type User = {
  email: string;
  name: string;
  token?: Token;
};
