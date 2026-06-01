import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
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

    async findTasksByProject (projectId: string): Promise<tasksEntity[]> {

        const tasks = await this.taskRepository.find({
            where: { projectId: projectId },
        });
        
        if (tasks.length === 0) throw new NotFoundException('No tasks yet');
        return tasks;
    }

    async createTask (dto: CreateTaskDto): Promise<tasksEntity> {

        const task = this.taskRepository.create({
            ...dto,
            id: randomBytes(16).toString('hex')
        });
        await this.taskRepository.save(task);

        return task;
    }

    async updateTask(taskId: string, dto: updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {id: taskId},
        })

        if (!task) throw new NotFoundException('Task not found');

        if (!dto) {
            throw new HttpException("Nothing to update", HttpStatus.BAD_REQUEST)
        }

        const updatedTask = await this.taskRepository.preload({
            id: taskId,
            ...dto
        })

        if (!updatedTask) throw new NotFoundException('Nothing to update')

        return this.taskRepository.save(updatedTask);
    }

    async deleteTask(taskId: string) {

        const result = await this.taskRepository.delete(taskId);

        if (result.affected === 0) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }
}
