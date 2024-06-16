/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { UserService } from './infrastructure/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
