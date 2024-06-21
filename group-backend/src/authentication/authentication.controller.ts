/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './infrastructure/authentication.service';
import { RegisterDto } from './infrastructure/dtos/register.dto';
import { LocalAuthGuard } from './infrastructure/guards/local.authentication.guard';
import { RefreshJwtGuard } from './infrastructure/guards/refresh.jwt.guard';
import { JwtAuthGuard } from './infrastructure/guards/jtw.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async register(@Body() registerdto: RegisterDto): Promise<void> {
    console.log(registerdto);
    return await this.authenticationService.register(registerdto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authenticationService.logout(req.user.uuid);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  async refreshTokens(@Request() req) {
    const [id, refresh_token] = [req.user.uuid, req.user.refreshToken];

    return await this.authenticationService.refreshTokens(id, refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async get(@Request() req) {
    return this.authenticationService.get(req.user.uuid);
  }
}
