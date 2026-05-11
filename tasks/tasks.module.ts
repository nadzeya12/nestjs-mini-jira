import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { ProjectsService } from '../projects/projects.service';
import { projectEntity } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tasksEntity, projectEntity])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService]
})
export class TasksModule {}
