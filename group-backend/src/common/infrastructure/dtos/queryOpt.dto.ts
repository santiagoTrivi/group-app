/* eslint-disable prettier/prettier */
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';

export class QueryOptDto {
  @IsNumberString()
  @IsOptional()
  limit: number;

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  get = () => {
    return new QueryOpt(this.page, this.limit, this.search);
  };
}
