/* eslint-disable prettier/prettier */

import { ConnectedUSerServiceInterface } from 'src/user/domain/connectedUser.service.interface';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConnectedUser } from '../entity/connected.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateConnectedUser } from 'src/user/domain/interfaces/createConnectedUser.interface';

@Injectable()
export class ConnectedUserService
  implements ConnectedUSerServiceInterface<User>
{
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly connedtedUserRepository: Repository<ConnectedUser>,
  ) {}
  async create(CreateConnectedUser: ICreateConnectedUser<User>): Promise<void> {
    await this.connedtedUserRepository.save({
      ...CreateConnectedUser,
    });
  }
  async deleteBySocketId(socketId: string): Promise<void> {
    await this.connedtedUserRepository.delete({ socketId });
  }
}
