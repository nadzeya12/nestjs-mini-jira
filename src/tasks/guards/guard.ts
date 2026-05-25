import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
<<<<<<< HEAD
<<<<<<<< HEAD:src/tasks/guards/guard.ts
import { ProjectsService } from "../../projects/projects.service";
import { userEntity } from "../../users/entities/user.entity";
import { TasksService } from "../tasks.service";
========
import { ProjectsService } from "./projects.service";
import { userEntity } from "./src/users/entities/user.entity";
>>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627:project.owner.guard.ts
=======
import { ProjectsService } from "../../../projects.service";
import { userEntity } from "../../users/entities/user.entity";
import { TasksService } from "../tasks.service";
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627

@Injectable()
export class tasksProjectGuard implements CanActivate {
    constructor (
        private readonly tasksService: TasksService,
        private readonly projectsService: ProjectsService
    ) {}

    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();

        const user: userEntity = request.headers.token;

        const projectId: string = request.Param.id;

        if(!user) {
            throw new ForbiddenException('No loginned user');
        }

        const project = await this.projectsService.findById(projectId);

        if(!project) {
            throw new NotFoundException('Project not found.')
        }

        const taskId: string = request.params.id;

        const task = await this.tasksService.findTask(taskId)

        if(String(task.projectId) !== String(project.id)) {
            throw new ForbiddenException('No access.')
        }

        request.task = task;
        return true;
    }
}