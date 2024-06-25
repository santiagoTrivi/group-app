/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Credentials } from './interfaces/credentials';
import { ILogin } from './interfaces/login.interface';
import { IRegister } from './interfaces/register.interface';

/* eslint-disable prettier/prettier */
export interface AuthenticationServiceInterface<T> {
  valideateUser(login: ILogin): Promise<T | null>;
  register(register: IRegister): Promise<Credentials>;
  login(user: T): Promise<Credentials>;
  getTokens(uuid: string, username: string): Promise<Credentials>;
  updateRefreshToken(id: string, refreshTokenInput: string): Promise<void>;
  refreshTokens(
    clientId: string,
    refreshTokenInput: string,
  ): Promise<Credentials>;
  logout(id: string): Promise<void>;

  get(id: string): Promise<any>;
}
