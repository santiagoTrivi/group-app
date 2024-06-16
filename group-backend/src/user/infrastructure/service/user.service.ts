/* eslint-disable prettier/prettier */

import { User } from '../entity/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/user/domain/user.service.interface';

@Injectable()
export class UserService implements IUserService<User> {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async findById(id: string): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }
}
