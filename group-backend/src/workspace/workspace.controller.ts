/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './infrastructure/service/workspace.service';
import { JwtAuthGuard } from 'src/authentication/infrastructure/guards/jtw.guard';
import { CreateWorkspaceDto } from './infrastructure/dtos/createWorkspace.dto';
import { QueryOptDto } from 'src/common/infrastructure/dtos/queryOpt.dto';
import { QueryAdapter } from 'src/common/infrastructure/adapter/query.adapter';
import { AddMemberDto } from './infrastructure/dtos/addMember.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req) {
    const ownerId = req.user.uuid;
    return await this.workspaceService.create({
      ownerId,
      ...createWorkspaceDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@Req() req, @Query() queryDto: QueryOptDto) {
    const userId = req.user.uuid;

    const queryOpt = QueryAdapter.get(queryDto);

    return await this.workspaceService.get(userId, queryOpt);
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMembers(@Param('id') workspace_id, @Query() queryDto: QueryOptDto) {
    const queryOpt = QueryAdapter.get(queryDto);

    return await this.workspaceService.getMembers(workspace_id, queryOpt);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addMember(
    @Param('id') workspace_id,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return await this.workspaceService.addMember(
      workspace_id,
      addMemberDto.userId,
    );
  }
}
