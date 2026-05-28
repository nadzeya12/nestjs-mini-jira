import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { AuthGuard } from './guards/token.guard';
import { projectOwnerGuard } from './guards/project.owner.guard';
import { currentUser } from './decorators/decorator';
import { ApiCreatedResponse, ApiHeader, ApiNoContentResponse, ApiOkResponse, ApiOperation} from '@nestjs/swagger';
import { ApiCommonResponcesForProjects } from '../swagger/Api.common.responces';

@Controller('projects')
@ApiCommonResponcesForProjects()
@ApiHeader({ 
    name: 'auth-token', 
    description: 'user token'
  })

export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) { }

  @ApiOperation({ 
    summary: 'Get a project by Id',
    description: 'This endpoint returns project by the id from parametrs.'
  })
  @ApiOkResponse({
    description: 'OK',
    example: {
      "id": "5529aee504b25b21b53af4a923eada4d",
      "title": "Small project",
      "description": null,
      "userId": "408fe856-6b5b-4bd1-b050-01b162ed82d8",
      "user": {
        "id": "408fe856-6b5b-4bd1-b050-01b162ed82d8"
      },
      "createdAt": "2026-05-28"
    }
  })
  @Get(':id')
  @UseGuards(AuthGuard, projectOwnerGuard)
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ 
    summary: `Get an array of all user's projects`,
    description: 'This endpoint returns the array of projects by loginned user.'
  })
  @ApiOkResponse({
    description: 'OK',
    example: {
      "project 1": "[...}",
      "project 2": "[...]"
    }
  })

  @Get()
  @UseGuards(AuthGuard, projectOwnerGuard)
  findAll(
    @currentUser() user: any,
  ) {
    return this.projectService.findAllByUser(user.id);
  }

  @ApiOperation({ 
    summary: `Create new project`,
    description: 'This endpoint creates a new project for loginned user.'
  })
  @ApiCreatedResponse({ description: 'Created succesfully!',
    example: {
      "id": "5529aee504b25b21b53af4a923eada4d",
    "title": "Small project",
    "description": null,
    "userId": "408fe856-6b5b-4bd1-b050-01b162ed82d8",
    "user": {
        "id": "408fe856-6b5b-4bd1-b050-01b162ed82d8"
    },
    "createdAt": "2026-05-28"
    }
  })
  @Post()
  @UseGuards(AuthGuard)
  create(
    @currentUser() user: any,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.createProject(dto, user.id);
  }

  @ApiOperation({
    summary: "Delete project by id.",
    description: 'This endpoint deletes project by id.'
  })
  @ApiNoContentResponse({ description: 'No content, project has been deleted'})
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, projectOwnerGuard)
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}