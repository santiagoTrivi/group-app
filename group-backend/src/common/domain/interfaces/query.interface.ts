/* eslint-disable prettier/prettier */
export class QueryOpt {
  public constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
    public readonly search: string = '',
  ) {}

  offSet(): number {
    return (this.page - 1) * this.limit;
  }
}
