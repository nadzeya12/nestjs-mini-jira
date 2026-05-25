import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { ProjectsService } from '../projects/projects.service';
import { projectEntity } from '../projects/entities/project.entity';
<<<<<<< HEAD
import { userEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([tasksEntity, projectEntity, userEntity])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService, UsersService]
=======

@Module({
  imports: [TypeOrmModule.forFeature([tasksEntity, projectEntity])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService]
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
})
export class TasksModule {}
