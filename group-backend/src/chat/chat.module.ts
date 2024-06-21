/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatGateway } from './infrastructure/gateway/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './infrastructure/entity/message.entity';
import { Room } from './infrastructure/entity/room.entity';
import { JoinedRoom } from './infrastructure/entity/joinedRoom.entity';
import { JoinedRoomService } from './infrastructure/service/joinedRoom.service';
import { MessageService } from './infrastructure/service/message.service';
import { RoomService } from './infrastructure/service/room.service';
import { ConnectedUserService } from 'src/user/infrastructure/service/connectedUser.service';
import { ConnectedUser } from 'src/user/infrastructure/entity/connected.user.entity';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { User } from 'src/user/infrastructure/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Room, JoinedRoom, ConnectedUser, User]),
  ],
  providers: [
    ChatGateway,
    JoinedRoomService,
    MessageService,
    RoomService,
    ConnectedUserService,
    UserService,
    JwtService,
  ],
})
export class ChatModule {}
