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
import { CreateProjectDto } from './src/projects/dto/create.project.dto';
import { AuthGuard } from '@nestjs/passport';
import { projectOwnerGuard } from './project.owner.guard';
import { currentUser } from './src/projects/decorators/decorator';
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