import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { tasksProjectGuard } from './guards/guard';
import { updateTaskDto } from './dto/update.task.dto';
  
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //Вопрос
  @Get(':projectId')
  @UseGuards(AuthGuard)
  get(@Param('id') id: string){
    return this.tasksService.findTask(id);
  }

  @Post()
  @UseGuards(AuthGuard)
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
