/* eslint-disable prettier/prettier */
import { User } from 'src/user/infrastructure/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'workspace' })
export class Workspace {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  public id: string;

  @Column()
  public name: string;
  @Column({ default: true })
  public isActice: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => User, (user) => user.workspaces, { cascade: true })
  @JoinTable({
    name: 'workspace_members',
    joinColumn: {
      name: 'workspace_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @Column({ default: 0 })
  membersCount: number;

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
