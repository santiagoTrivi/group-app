/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './infrastructure/service/user.service';
import { QueryAdapter } from 'src/common/infrastructure/adapter/query.adapter';
import { QueryOptDto } from 'src/common/infrastructure/dtos/queryOpt.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getMembers(@Query() queryDto: QueryOptDto) {
    const queryOpt = QueryAdapter.get(queryDto);

    return await this.userService.get(queryOpt);
  }
}
