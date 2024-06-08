/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './infrastructure/authentication.service';
import { RegisterDto } from './infrastructure/dtos/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async register(@Body() registerdto: RegisterDto): Promise<void> {
    return await this.authenticationService.register(registerdto);
  }

  @Get()
  async get() {
    return await this.authenticationService.get();
  }
}
