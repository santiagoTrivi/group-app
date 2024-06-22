/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JoinedRoomService } from '../service/joinedRoom.service';
import { MessageService } from '../service/message.service';
import { RoomService } from '../service/room.service';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { ConnectedUserService } from 'src/user/infrastructure/service/connectedUser.service';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { Room } from '../entity/room.entity';
import { PageOpt } from 'src/chat/domain/pagination.opt';
import { ICreateMessage } from '../interfaces/createMessage.interface';
import { JoinedRoom } from '../entity/joinedRoom.entity';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private readonly joinedRoomService: JoinedRoomService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly connectedUserService: ConnectedUserService,
  ) {}

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedRoomService.deleteAll();
  }

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.validatejwt(
        socket.handshake.headers.authorization,
      );
      const user = await this.userService.findById(decodedToken.user.id);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsByUser(
          user.id,
          new QueryOpt(1, 10),
        );

        await this.connectedUserService.create({ socketId: socket.id, user });

        return this.server.to(socket.id).emit('rooms', rooms);
      }
    } catch {
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: Room) {
    const createdRoom = await this.roomService.createRoom({
      room,
      user: socket.data.user,
    });

    for (const user of createdRoom.users) {
      const connections = await this.connectedUserService.findByUser(user);
      const rooms = await this.roomService.getRoomsByUser(
        user.id,
        new QueryOpt(1, 10),
      );
      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(socket: Socket, pageOpt: PageOpt) {
    const rooms = await this.roomService.getRoomsByUser(
      socket.data.user.id,
      this.handleIncomingPageRequest(pageOpt),
    );

    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(socket: Socket, room: Room) {
    const messages = await this.messageService.findMessagesForRoom(
      room,
      new QueryOpt(1, 10),
    );

    await this.joinedRoomService.create({
      socketId: socket.id,
      user: socket.data.user,
      room,
    });

    await this.server.to(socket.id).emit('messages', messages);
  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(socket: Socket) {
    // remove connection from JoinedRooms
    await this.joinedRoomService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, message: ICreateMessage) {
    const createdMessage = await this.messageService.create({
      ...message,
      user: socket.data.user,
    });
    const room = await this.roomService.getRoom(createdMessage.room.id);
    const joinedUsers: JoinedRoom[] = await this.joinedRoomService.findByRoom(
      room,
    );
    // TODO: Send new Message to all joined Users of the room (currently online)
    for (const user of joinedUsers) {
      await this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }
  }

  private handleIncomingPageRequest(pageOpt: PageOpt): QueryOpt {
    return new QueryOpt(pageOpt.page, pageOpt.limit);
  }

  validatejwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
