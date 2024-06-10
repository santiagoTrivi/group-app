/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './infrastructure/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/infrastructure/entity/user.entity';
import { BcryptPasswordHashService } from './infrastructure/bcryptPasswordHash.service';
import { JwtModuleConfig } from 'src/config/jwtModule';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh.jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModuleConfig.forRoot()],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    BcryptPasswordHashService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthenticationModule {}
