import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';

@Controller('projects')

export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Get(':userId')
  findAll(
    @Param('userId', ParseUUIDPipe) userId: string) {
    console.log('returned id: ', userId)
    return this.projectService.findAllByUser(userId);
  }

  @Post(':userId')
  create( 
    @Param('userId', ParseUUIDPipe) userId: string, 
    @Body() dto: CreateProjectDto 
    ) {

    return this.projectService.createProject(userId, dto);
    console.log('returned id: ', userId);
  }

}
