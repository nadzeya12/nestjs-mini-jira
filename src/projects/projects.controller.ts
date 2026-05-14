import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
//import { projectEntity } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
// import { AuthGuard } from '../auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')

export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create( @Body() dto: CreateProjectDto ) {
    return this.projectService.createProject(dto)
    }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('projects/:id')
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Delete('projects/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
} 
