import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { tasksEntity } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { projectEntity } from "../../projects/entities/project.entity";

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(tasksEntity) private readonly taskRepository: Repository<tasksEntity>,
    @InjectRepository(projectEntity) private readonly projectsRepository: Repository<projectEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id; 
    const projectId = request.params.projectId; 

    console.log("projectId: ", projectId);
    console.log("userId: ", userId);

    if (!userId || !projectId) throw new ForbiddenException('No userId or projectId');

    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        userId: userId
      }
    })
    if (!project) throw new HttpException('No access. Not yours tasks', HttpStatus.FORBIDDEN);

    return true;

  }
}
