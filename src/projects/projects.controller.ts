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
import { ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) { }

  @ApiOperation({ 
    summary: 'Get a project by Id',
    description: 'This endpoint returns project by the id from parametrs.'
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Project was found succsesfully!'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Project not found.'})
  @ApiHeader({ 
    name: 'auth-token', 
    description: 'user token'
  })
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