export class PaginationResult<T> {
  readonly data: T[];
  readonly nextPage: boolean;
  readonly prevPage: boolean;
  readonly totalPages: number;

  constructor(
    data: T[],
    nextPage: boolean,
    prevPage: boolean,
    totalPages: number
  ) {
    this.data = data;
    this.nextPage = nextPage;
    this.prevPage = prevPage;
    this.totalPages = totalPages;
  }

  static empty<T>() {
    return new PaginationResult<T>([], false, false, 0);
  }

  static create<T>(
    items: T[],
    nextPage: boolean,
    prevPage: boolean,
    totalPages: number
  ) {
    return new PaginationResult<T>(items, nextPage, prevPage, totalPages);
  }
}
