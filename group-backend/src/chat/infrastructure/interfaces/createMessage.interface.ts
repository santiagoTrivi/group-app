/* eslint-disable prettier/prettier */
import { User } from 'src/user/infrastructure/entity/user.entity';
import { Room } from '../entity/room.entity';

export interface ICreateMessage {
  text: string;
  user: User;
  room: Room;
}
