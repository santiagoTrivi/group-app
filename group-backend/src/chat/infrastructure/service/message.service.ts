/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateMessage } from '../interfaces/createMessage.interface';
import { Room } from '../entity/room.entity';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { Pagination } from 'src/common/domain/pagination';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(CreateMessage: ICreateMessage): Promise<Message> {
    return this.messageRepository.save(
      this.messageRepository.create(CreateMessage),
    );
  }

  async findMessagesForRoom(
    room: Room,
    queryOpt: QueryOpt,
  ): Promise<Pagination<Message>> {
    const [messages, count] = await this.messageRepository.findAndCount({
      where: { room: room },
      order: { created_at: 'DESC' },
      relations: ['user', 'room'],
      take: queryOpt.limit,
      skip: queryOpt.offSet(),
    });

    if (!messages && !count) return Pagination.create([], queryOpt, 0);

    return Pagination.create(messages, queryOpt, count);
  }
}
