/* eslint-disable prettier/prettier */
import { ICreateConnectedUser } from './interfaces/createConnectedUser.interface';

export interface ConnectedUSerServiceInterface<T> {
  create(CreateConnectedUser: ICreateConnectedUser<T>): Promise<void>;
  deleteBySocketId(socketId: string): Promise<void>;
}
