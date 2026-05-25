import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { AuthGuard } from './guards/token.guard';
import { projectOwnerGuard } from './guards/project.owner.guard';
import { currentUser } from './decorators/decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) { }

  @Get(':id')
  @UseGuards(AuthGuard, projectOwnerGuard)
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @currentUser() user: any,
  ) {
    return this.projectService.findAllByUser(user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @currentUser() user: any,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.createProject(dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, projectOwnerGuard)
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
