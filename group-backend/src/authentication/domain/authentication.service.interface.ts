/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { ILogin } from './interfaces/login.interface';
import { IRegister } from './interfaces/register.interface';

/* eslint-disable prettier/prettier */
export interface AuthenticationServiceInterface<T> {
  valideateUser(login: ILogin): Promise<T | null>;
  register(register: IRegister): Promise<void>;
  // login(user: T): Promise<void>;
}
