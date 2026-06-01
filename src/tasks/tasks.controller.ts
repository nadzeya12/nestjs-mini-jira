import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '../projects/guards/token.guard';
import { updateTaskDto } from './dto/update.task.dto';
import { TaskOwnerGuard } from './guards/taskOwnerGuard';
import { CountGuard } from './guards/count-guard';
import { ApiCreatedResponse, ApiHeader, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiCommonResponcesForTasks } from './swagger/Api.common.responces-forTasks';
import { currentProject } from './decorators/decoratorTask';

@Controller('tasks')
@ApiCommonResponcesForTasks()
@ApiHeader({ 
    name: 'auth-token', 
    description: 'user token'
  })
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Get tasks by projectId',
    description: 'This endpoint returns all tasks by projectId of current user',
  })
  @ApiOkResponse({
      description: 'OK',
      example: {
        "task 1": "[...]",
        "task 2": "[...]"
      }
    })
  @Get(':projectId')
  @UseGuards(AuthGuard, TaskOwnerGuard)
  get(
    @Param('projectId') projectId: string)
    {
    return this.tasksService.findTasksByProject(projectId);
  }

  @ApiOperation({ 
      summary: `Create new task`,
      description: 'This endpoint creates a new task for project with projectId in req.body.'
    })
    @ApiCreatedResponse({ description: 'Created succesfully!',
      example: {
        "id": "28f57690584de92fa73087c9169d0645",
        "title": "Task 1",
        "description": null,
        "createdAt": "2026-05-29T08:34:05.267Z",
        "status": "to_do",
        "projectId": "fa7483912839592147ef9f647b670f14"
      }
    })
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() dto: CreateTaskDto) 
    {
    return this.tasksService.createTask(dto);
  }

  @ApiOperation({
    summary: "Update task by id.",
  description: "This endpoint updates task by id with dto."
  })
  @ApiOkResponse({
    description: "Ok, task has been updated."
  })
  @Patch(':id')
  @UseGuards(AuthGuard, CountGuard)
  updateTask(
    @Param('id') taskId: string, 
    @Body() dto: updateTaskDto) 
    {
    return this.tasksService.updateTask(taskId, dto);
  }

  @ApiOperation({
      summary: "Delete task by id.",
      description: 'This endpoint deletes task by id.'
    })
  @ApiNoContentResponse({ description: 'No content, task has been deleted'})
  @Delete(':id')
  @UseGuards(AuthGuard, CountGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
