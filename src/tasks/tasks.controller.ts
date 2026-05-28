import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { updateTaskDto } from './dto/update.task.dto';
import { currentProject } from './decorators/decorator';
import { TaskOwnerGuard } from './guards/count.guard';
import { projectOwnerGuard } from '../projects/guards/project.owner.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':projectId')
  @UseGuards(AuthGuard, TaskOwnerGuard)
  get(
    @Param('projectId') projectId: string)
    {
    return this.tasksService.findTasksByProject(projectId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() dto: CreateTaskDto) 
    {
    return this.tasksService.createTask(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, TaskOwnerGuard)
  updateTask(
    @Param('id') taskId: string, 
    @Body() dto: updateTaskDto) 
    {
    return this.tasksService.updateTask(taskId, dto);
  }

  //Jeszcze sprawdzić na ownera
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') taskId: string) {
      return this.tasksService.deleteTask(taskId);
  }
}
