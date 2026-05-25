import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { ProjectsService } from '../projects/projects.service';
import { randomBytes } from 'crypto';
<<<<<<< HEAD
import { updateTaskDto } from './dto/update.task.dto';
=======
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627

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

<<<<<<< HEAD
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
=======
    async createTask (dto: CreateTaskDto, projectId: string): Promise<tasksEntity> {

        const task = this.taskRepository.create({
            ...dto,
            id: randomBytes(16).toString('hex'),
            project: {id: projectId}   
        });     
        await this.taskRepository.save(task);
        return task;
    }
    async deleteTask(id: string) {
        const result = await this.taskRepository.delete(id);
    
        return HttpStatus.NO_CONTENT;
      }
}
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
