/* eslint-disable prettier/prettier */
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from '../service/message.service';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { PageOpt } from 'src/chat/domain/pagination.opt';
import { WorkspaceService } from 'src/workspace/infrastructure/service/workspace.service';
import { CreateMessageDto } from '../dto/createMessage.dto';

@WebSocketGateway(8050, {
  cors: true,
  transports: ['websocket', 'polling'],
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  preflightContinue: false,
  methods: ['*', 'PATCH'],
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Accept',
    'Origin',
    'x-refresh-token',
    'Authorization',
  ],
  credentials: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async handleConnection(socket: Socket) {
    console.log(socket.id);
    try {
      const decodedToken = await this.validatejwt(
        socket.handshake.headers.authorization,
      );
      const user = await this.userService.findById(decodedToken.user.id);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const joined = await this.workspaceService.getJoined(
          user.id,
          new QueryOpt(1, 50),
        );

        await this.userService.update(user, socket.id);

        return this.server.to(socket.id).emit('joined', joined);
      }
    } catch {
      return this.disconnect(socket);
    }
  }
  async handleDisconnect(socket: Socket) {
    await this.userService.update(socket.data.user, null);
    socket.disconnect();
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(socket: Socket, pageOpt: PageOpt) {
    const joined = await this.workspaceService.getJoined(
      socket.data.user.id,
      this.handleIncomingPageRequest(pageOpt),
    );

    return this.server.to(socket.id).emit('joined', joined);
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, @MessageBody() message: CreateMessageDto) {
    const createdMessage = await this.messageService.create({
      ...message,
      sender_id: socket.data.user.id,
    });
    const receiver = await this.userService.findById(message.receiver_id);
    // TODO: Send new Message to all joined Users of the room (currently online)
    await this.server
      .to(receiver.socketId)
      .emit('messageAdded', createdMessage);
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
