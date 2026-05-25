<<<<<<< HEAD
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { tasksProjectGuard } from './guards/guard';
import { updateTaskDto } from './dto/update.task.dto';
=======
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { currentProject } from './decorators/decorator';
import { tasksProjectGuard } from './guards/guard';
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
  
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //Вопрос
<<<<<<< HEAD
  @Get(':projectId')
=======
  @Get('id')
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
  @UseGuards(AuthGuard)
  get(@Param('id') id: string){
    return this.tasksService.findTask(id);
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
    deleteTask(@Param('id') id: string) {
      return this.tasksService.deleteTask(id);
  }
}
