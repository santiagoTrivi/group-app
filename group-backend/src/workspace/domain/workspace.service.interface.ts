/* eslint-disable prettier/prettier */
import { Pagination } from 'src/common/domain/pagination';
import { ICreateWorkspace } from './interfaces/createWorkspace.interface';
import { IStoreWorkspace } from './interfaces/storeWorkspace.interface';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';

export interface IWorkspaceService<T> {
  create(data: ICreateWorkspace): Promise<void>;
  store<R>(data: IStoreWorkspace<R>): Promise<T>;
  get(userId: string, queryOpt: QueryOpt): Promise<Pagination<T>>;
  addMember(workspaceId: string, userId: string): Promise<void>;
}
