/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkspaceService } from './infrastructure/service/workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Workspace } from './infrastructure/entity/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { User } from 'src/user/infrastructure/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, UserService],
})
export class WorkspaceModule {}
