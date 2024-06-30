/* eslint-disable prettier/prettier */

import { User } from '../entity/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/user/domain/user.service.interface';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { Pagination } from 'src/common/domain/pagination';

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

  async update(user: User, socketId: string | null): Promise<void> {
    await this.UserRepository.update({ id: user.id }, { socketId });
  }

  async get(queryOpt: QueryOpt): Promise<Pagination<User>> {
    if (queryOpt.search === '') return Pagination.create([], queryOpt, 0);

    if (queryOpt.search !== '') {
      const query: FindOptionsWhere<User>[] = [
        { firstName: Like(`%${queryOpt.search}%`) },
        { lastName: Like(`%${queryOpt.search}%`) },
        { email: Like(`%${queryOpt.search}%`) },
      ];

      const [users, count] = await this.UserRepository.findAndCount({
        where: query,
        select: ['id', 'firstName', 'lastName'],
        take: queryOpt.limit,
        skip: queryOpt.offSet(),
      });
      if (!users && !count) return Pagination.create([], queryOpt, 0);
      return Pagination.create(users, queryOpt, count);
    }
  }
}
