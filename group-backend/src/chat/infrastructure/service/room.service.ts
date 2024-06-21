/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Room } from '../entity/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateRoom } from '../interfaces/createRoom.interface';
import { User } from 'src/user/infrastructure/entity/user.entity';
import { Pagination } from 'src/common/domain/pagination';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(createRoom: ICreateRoom): Promise<Room> {
    const newOne = await this.addUserToRoom(createRoom);
    return this.roomRepository.save(newOne);
  }

  async getRoom(id: Room['id']): Promise<Room> {
    return this.roomRepository.findOne({ where: { id }, relations: ['users'] });
  }

  async getRoomsByUser(
    user_id: User['id'],
    queryOpt: QueryOpt,
  ): Promise<Pagination<Room>> {
    const [rooms, count] = await this.roomRepository.findAndCount({
      where: { users: { id: user_id } },
      order: { created_at: 'DESC' },
      relations: ['users'],
      take: queryOpt.limit,
      skip: queryOpt.offSet(),
    });
    if (!rooms && !count) return Pagination.create([], queryOpt, 0);
    return Pagination.create(rooms, queryOpt, count);
  }

  async addUserToRoom(createRoom: ICreateRoom): Promise<Room> {
    const { user, room } = createRoom;
    room.users.push(user);
    return room;
  }
}
