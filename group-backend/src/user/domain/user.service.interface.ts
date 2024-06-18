/* eslint-disable prettier/prettier */
export interface IUserService<T> {
  findById(id: string): Promise<T>;
}
