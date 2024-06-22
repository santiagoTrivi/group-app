export interface PaginationProps {
  page: number;
  limit: number;
  search?: string;
}

export class Pagination {
  readonly page: number;
  readonly limit: number;
  readonly search?: string;

  constructor(props: PaginationProps) {
    this.page = props.page;
    this.limit = props.limit;
    this.search = props.search;
  }

  static default() {
    return new Pagination({ page: 1, limit: 10, search: "" });
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  change(pagination: Partial<PaginationProps>) {
    return new Pagination({ ...this, ...pagination });
  }
}
