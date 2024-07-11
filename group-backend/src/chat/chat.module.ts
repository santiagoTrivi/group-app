/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatGateway } from './infrastructure/gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './infrastructure/entity/message.entity';
import { MessageService } from './infrastructure/service/message.service';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { User } from 'src/user/infrastructure/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Workspace } from 'src/workspace/infrastructure/entity/workspace.entity';
import { WorkspaceService } from 'src/workspace/infrastructure/service/workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Workspace])],
  providers: [
    ChatGateway,
    MessageService,
    UserService,
    JwtService,
    WorkspaceService,
  ],
})
export class ChatModule {}
