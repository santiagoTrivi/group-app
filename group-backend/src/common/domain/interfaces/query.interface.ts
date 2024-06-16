/* eslint-disable prettier/prettier */
export class QueryOpt {
  public constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}

  offSet(): number {
    return (this.page - 1) * this.limit;
  }
}
