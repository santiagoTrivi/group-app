/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnection } from './database/database.connection';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConnection.forRoot(),
    AuthenticationModule,
    UserModule,
    ChatModule,
    WorkspaceModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
