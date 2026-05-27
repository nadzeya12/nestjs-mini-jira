import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { tasksEntity } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(tasksEntity) private readonly taskRepository: Repository<tasksEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id; 
    const taskId = +request.params.id; 

    if (!userId || !taskId) return false;

    const count = await this.taskRepository
      .createQueryBuilder('task')
      .innerJoin('task.project', 'project')
      .where('task.id = :taskId', { taskId })
      .andWhere('project.userId = :userId', { userId })
      .getCount();

    if (count === 0) {
      throw new HttpException('To nie Twój task!', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
