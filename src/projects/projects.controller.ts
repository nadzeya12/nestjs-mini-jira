import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query, UseGuards} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { projectOwnerGuard } from './guards/project.owner.guard';
import { listOfProjects } from './guards/findlistProjects.guard';
import { Headers } from '@nestjs/common';
import { AuthGuard } from './guards/token.guard';

@Controller('projects')

export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':id')
  @UseGuards(AuthGuard, projectOwnerGuard)
  findById(@Param('id') userId: string) {
    return this.projectService.findById(userId);
  }

  @Get()
  @UseGuards(listOfProjects)
  findAll(
    @Headers('userId') userId: string) {
    console.log('returned id: ', userId)
    return this.projectService.findAllByUser(userId);
  }

  // @Post()
  // @UseGuards(projectOwnerGuard)
  // create( @Body() dto: CreateProjectDto ) {
  //   return this.projectService.createProject(dto);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }


}
