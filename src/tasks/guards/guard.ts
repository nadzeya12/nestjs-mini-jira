import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "../../projects/projects.service";
import { userEntity } from "../../users/entities/user.entity";
import { TasksService } from "../tasks.service";

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