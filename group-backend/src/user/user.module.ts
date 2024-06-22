/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entity/user.entity';
import { ConnectedUser } from './infrastructure/entity/connected.user.entity';
import { UserService } from './infrastructure/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ConnectedUser])],
  controllers: [UserController],
  providers: [UserService, ConnectedUser],
  exports: [UserService, ConnectedUser],
})
export class UserModule {}
