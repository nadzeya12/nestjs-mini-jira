import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { tasksEntity } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CountGuard implements CanActivate {
  constructor(
    @InjectRepository(tasksEntity) private readonly taskRepository: Repository<tasksEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id; 
    const taskId = request.params.id; 

    if (!userId || !taskId) return false;

    const count = await this.taskRepository.count({
  where: {
    id: taskId,
    project: {
      userId: userId
    }
  }
});
    return true;
  }
}