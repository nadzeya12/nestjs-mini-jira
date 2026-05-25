import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { ProjectsService } from '../projects/projects.service';
import { randomBytes } from 'crypto';
import { updateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository (tasksEntity)
        private readonly  taskRepository: Repository<tasksEntity>,
    ) {}

    async findTask (id: string): Promise<tasksEntity> {
        const task = await this.taskRepository.findOne({
            where: { id: id },
        });
        
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async createTask (dto: CreateTaskDto): Promise<tasksEntity> {

        const task = this.taskRepository.create({
            ...dto,
            id: randomBytes(16).toString('hex')
        });
        await this.taskRepository.save(task);

        return task;
    }

    async updateTask(id: string, dto: updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {id: id},
        })

        if (!task) throw new NotFoundException('Task not found');

        const updatedTask = await this.taskRepository.preload({
            id: id,
            ...dto
        })

        if (!updatedTask) throw new NotFoundException('Nothing to update')

        return this.taskRepository.save(updatedTask);
    }

    async deleteTask(id: string) {
       const result = await this.taskRepository.delete(id);
    
        return result;
    }
}