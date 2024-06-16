/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';

export class QueryOptDto {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  get = () => {
    return new QueryOpt(this.page, this.limit, this.search);
  };
}
