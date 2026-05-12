<<<<<<< HEAD
// import { Body, Controller, Post } from '@nestjs/common';
// import { CreateTaskDto } from './dto/create.task.dto';
  
// @Controller('tasks')
// export class TasksController {
//   constructor(private readonly tasksService: TasksService) {}

//   @Post('projects')
//     create(@Body() dto: CreateTaskDto) {
//       return this.tasksService.createTask(dto);
//     }
// }
=======
import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
  
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('projects')
    create(@Body() dto: CreateTaskDto) {
      return this.tasksService.createTask(dto);
    }
}
>>>>>>> e2e2b1f4c97ff4adf546cd530fb91113adc5f91e
