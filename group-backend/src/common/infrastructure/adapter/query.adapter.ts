/* eslint-disable prettier/prettier */
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { QueryOptDto } from '../dtos/queryOpt.dto';

export class QueryAdapter {
  static get = (query: QueryOptDto) => {
    return new QueryOpt(query.page, query.limit, query.search);
  };
}
