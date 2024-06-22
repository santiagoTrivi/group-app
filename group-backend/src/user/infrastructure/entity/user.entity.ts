/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConnectedUser } from './connected.user.entity';
import { Workspace } from 'src/workspace/infrastructure/entity/workspace.entity';
import { Message } from 'src/chat/infrastructure/entity/message.entity';
import { Room } from 'src/chat/infrastructure/entity/room.entity';
import { JoinedRoom } from 'src/chat/infrastructure/entity/joinedRoom.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  public id: string;

  @Column()
  public firstName: string;
  @Column()
  public lastName: string;
  @Column()
  public email: string;
  @Column()
  public password: string;

  @Column({
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => ConnectedUser, (connection) => connection.user)
  connections: ConnectedUser[];

  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  workspaces: Workspace[];

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  @OneToMany(() => JoinedRoom, (joinedRoom) => joinedRoom.room)
  joinedRooms: JoinedRoom[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
