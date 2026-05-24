import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Injectable()
export class listOfProjects implements CanActivate {
    constructor (private readonly projectsService: ProjectsService) {}

    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();

        const user = request.headers.token;

        if(!user) {
            throw new ForbiddenException('No loginned user')
        }

        const projects = await this.projectsService.findAllByUser(user.id);

        if(!projects) {
            throw new NotFoundException('Projects not found.')
        }

        request.projects = projects;
        return true;
    }
}