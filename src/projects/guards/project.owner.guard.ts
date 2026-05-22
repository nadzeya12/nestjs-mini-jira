import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "../projects.service";
import { userEntity } from "../../users/entities/user.entity";

@Injectable()
export class projectOwnerGuard implements CanActivate {
    constructor(private readonly projectsService: ProjectsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const user: userEntity = request.user;
        const projectId: string = request.params.id;

        if (!user) {
            throw new ForbiddenException('No logged in user');
        }

        const project = await this.projectsService.findById(projectId);

        if (!project) {
            throw new NotFoundException('Project not found.');
        }

        if (String(project.userId) !== String(user.id)) {
            throw new ForbiddenException('No access.');
        }

        request.project = project;
        return true;
    }
}