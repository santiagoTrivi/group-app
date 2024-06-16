/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { IWorkspaceService } from 'src/workspace/domain/workspace.service.interface';
import { Workspace } from '../entity/workspace.entity';
import { ICreateWorkspace } from 'src/workspace/domain/interfaces/createWorkspace.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/infrastructure/service/user.service';
import { IStoreWorkspace } from 'src/workspace/domain/interfaces/storeWorkspace.interface';
import { QueryOpt } from 'src/common/domain/interfaces/query.interface';
import { Pagination } from 'src/common/domain/pagination';
import { User } from 'src/user/infrastructure/entity/user.entity';

@Injectable()
export class WorkspaceService implements IWorkspaceService<Workspace> {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly userService: UserService,
  ) {}
  async getMembers(
    workspaceId: string,
    queryOpt: QueryOpt,
  ): Promise<Pagination<User>> {
    const [users, count] = await this.UserRepository.findAndCount({
      where: {
        workspaces: {
          id: workspaceId,
        },
      },
      select: ['id', 'firstName', 'lastName'],
      take: queryOpt.limit,
      skip: queryOpt.offSet(),
    });

    if (!users && !count) return Pagination.create([], queryOpt, 0);
    return Pagination.create(users, queryOpt, count);
  }

  async addMember(workspaceId: string, userId: string): Promise<void> {
    const user = await this.userService.findById(userId);

    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId, isActice: true },
      relations: ['users'],
    });

    const exist = workspace.users.find((u) => u.id === userId);

    if (exist) throw new HttpException('user already exist', 400);

    if (!workspace) throw new HttpException('workspace not found', 400);

    workspace.membersCount += 1;

    if (!workspace.users) workspace.users = [];

    workspace.users.push(user);
    await this.workspaceRepository.save(workspace);
  }
  async get(
    userId: string,
    queryOpt: QueryOpt,
  ): Promise<Pagination<Workspace>> {
    const [data, count] = await this.workspaceRepository.findAndCount({
      where: {
        owner: {
          id: userId,
        },
        isActice: true,
      },
      take: queryOpt.limit,
      skip: queryOpt.offSet(),
    });

    if (!data && !count) return Pagination.create([], queryOpt, 0);

    return Pagination.create(data, queryOpt, count);
  }
  async create(data: ICreateWorkspace): Promise<void> {
    const { ownerId, name } = data;

    const owner = await this.userService.findById(ownerId);

    this.store({
      owner,
      name,
    });
    return;
  }
  async store<R>(data: IStoreWorkspace<R>): Promise<Workspace> {
    const { owner, name } = data;
    const workspace = this.workspaceRepository.create({
      owner,
      name,
    });
    return await this.workspaceRepository.save(workspace);
  }
}
