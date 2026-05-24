import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { projectEntity } from './src/projects/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './src/users/users.service';
import { userEntity } from './src/users/entities/user.entity';

//OK
@Module({
  imports: [TypeOrmModule.forFeature([projectEntity, userEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
})
export class ProjectsModule {}