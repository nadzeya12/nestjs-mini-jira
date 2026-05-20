import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "../projects.service";
import { Observable } from "rxjs";

@Injectable()
export class projectOwnerGuard implements CanActivate {
    constructor (private readonly projectsService: ProjectsService) {}

    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();

        const user = request.headers.token;

        const projectId = request.Param.id;

        if(!user) {
            throw new ForbiddenException('No loginned user')
        }

        const project = await this.projectsService.findById(projectId);

        if(!project) {
            throw new NotFoundException('Project not found.')
        }

        if(String(project.userId) !== String(user.id)) {
            throw new ForbiddenException('No access.')
        }

        request.project = project;
        return true;
    }
}