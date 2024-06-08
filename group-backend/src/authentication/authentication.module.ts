/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './infrastructure/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/infrastructure/entity/user.entity';
import { BcryptPasswordHashService } from './infrastructure/bcryptPasswordHash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, BcryptPasswordHashService],
})
export class AuthenticationModule {}
