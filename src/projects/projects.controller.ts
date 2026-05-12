// import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
// import { Repository } from 'typeorm';
// //import { projectEntity } from './entities/project.entity';
// import { ProjectsService } from './projects.service';
// import { CreateProjectDto } from './dto/create.Post.dto';

// @Controller('projects')
// export class ProjectsController {
//   constructor(private readonly projectService: ProjectsService) {}

//   @Get('projects')
//   findAll() {
//     return this.projectService.findAll();
//   }

//   @Get('projects/:id')
//   findById(@Param('id') id: string) {
//     return this.projectService.findById(id);
//   }

//   @Post('projects')
//   create(@Body() dto: CreateProjectDto) {
//     return this.projectService.createProject(dto);
//   }
// }
