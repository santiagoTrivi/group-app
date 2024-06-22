/* eslint-disable prettier/prettier */
import { User } from 'src/user/infrastructure/entity/user.entity';
import { Room } from '../entity/room.entity';

export interface ICreateRoom {
  user: User;
  room: Room;
}
