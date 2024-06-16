/* eslint-disable prettier/prettier */
import { QueryOpt } from './interfaces/query.interface';

export class Pagination<T> {
  private constructor(
    public readonly data: T[] = [],
    public readonly totalPages: number = 0,
    public readonly currentPage: number = 0,
    public readonly prevPage: boolean = false,
    public readonly nextPage: boolean = false,
  ) {}

  static empty<U>(): Pagination<U> {
    return new Pagination<U>([]);
  }

  static create<U>(
    data: U[],
    queryOpt: QueryOpt,
    count: number,
  ): Pagination<U> {
    const { page, limit } = queryOpt;
    const totalPages = Math.ceil(count / limit);
    const nextPage = page * limit < count;
    const prevPage = page > 1;
    return new Pagination<U>(data, totalPages, page, prevPage, nextPage);
  }
}
