import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { currentProject } from './decorators/decorator';
import { tasksProjectGuard } from './guards/guard';
  
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //Вопрос
  @Get('id')
  @UseGuards(AuthGuard)
  get(@Param('id') id: string){
    return this.tasksService.findTask(id);
  }

  @Post('')
  @UseGuards(AuthGuard)
  create(
    @currentProject() project: any,
    @Body() dto: CreateTaskDto) 
    {
    return this.tasksService.createTask(dto, project.id);
  }

  //Вопрос по гарду
  @Patch(':id')
  @UseGuards(AuthGuard, tasksProjectGuard)

  @Delete(':id')
  @UseGuards(AuthGuard, tasksProjectGuard)
    deleteTask(@Param('id') id: string) {
      return this.tasksService.deleteTask(id);
  }
}
