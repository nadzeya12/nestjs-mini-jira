import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { updateTaskDto } from './dto/update.task.dto';
import { tasksProjectGuard } from './guards/guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get(':projectId')
  // @UseGuards(AuthGuard)
  // get(@Param('id') projectId: string){
  //   return this.tasksService.findTaskS(projectId);
  // }

  @Post()
  @UseGuards(AuthGuard, tasksProjectGuard)
  create(
    @Body() dto: CreateTaskDto) 
    {
    return this.tasksService.createTask(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateTask(
    @Param('id') id: string, 
    @Body() dto: updateTaskDto) 
    {
    return this.tasksService.updateTask(id, dto);
  }
  

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') id: string) {
      return this.tasksService.deleteTask(id);
  }
}
