import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';

@Controller('projects')

export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':userId')
  findAll(
    @Param('userId', ParseUUIDPipe) userId: string) {
    console.log('returned id: ', userId)
    return this.projectService.findAllByUser(userId);
  }
  
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }
  
  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
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
