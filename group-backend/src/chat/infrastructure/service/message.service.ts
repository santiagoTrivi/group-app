/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateMessage } from '../interfaces/createMessage.interface';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { Pagination } from 'src/common/domain/pagination';
import { User } from 'src/user/infrastructure/entity/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(CreateMessage: ICreateMessage): Promise<Message> {
    const { text, sender_id, receiver_id } = CreateMessage;
    return this.messageRepository.save(
      this.messageRepository.create({
        text,
        sender: { id: sender_id },
        receiver: { id: receiver_id },
      }),
    );
  }

  async findMessages(
    user: User,
    queryOpt: QueryOpt,
  ): Promise<Pagination<Message>> {
    const [messages, count] = await this.messageRepository.findAndCount({
      where: [{ sender: user }, { receiver: user }],
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
      take: queryOpt.limit,
      skip: queryOpt.offSet(),
    });

    if (!messages && !count) return Pagination.create([], queryOpt, 0);

    return Pagination.create(messages, queryOpt, count);
  }
}
