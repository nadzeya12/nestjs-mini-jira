import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository (tasksEntity)
        private readonly  taskRepository: Repository<tasksEntity>,
        private readonly projectService: ProjectsService,
    ) {}

    async createTask (dto: CreateTaskDto): Promise<tasksEntity> {
        const {projectId, title, description, status} = dto;

        const project = await this.projectService.findById(projectId);

        const task = this.taskRepository.create({
            title, 
            description,
            status,
            project,    
        });     
        return await this.taskRepository.save(task);
    }
}
