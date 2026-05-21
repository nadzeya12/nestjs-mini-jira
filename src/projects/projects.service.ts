import { Injectable, NotFoundException } from '@nestjs/common';
import { projectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { randomBytes } from 'crypto';
import { userEntity } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor (
    @InjectRepository(projectEntity) 
    private readonly projectRepository: Repository<projectEntity>,
    @InjectRepository(userEntity)
    private readonly usersRepository: Repository<userEntity>
  ) {}
  
  async findAllByUser(userId: string): Promise<projectEntity[]> {

    const existsUser = await this.usersRepository.exists({
      where: { id: userId}
    });

    if (!existsUser) {
      throw new NotFoundException('User does not exist')
    }

    return await this.projectRepository.find({ 
      where: {userId: userId}
    });
  }

  async findById(userId: string): Promise<projectEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if(!project) throw new NotFoundException('Project not found')

    return project;
  }

  async deleteProject(id: string) {
    const project = await this.projectRepository.findOneBy({id});

    if(!project) throw new NotFoundException('Project with id: ${id} not found');

    return await this.projectRepository.remove(project);
  }

  async createProject( dto: CreateProjectDto ): Promise<projectEntity> {

    const project = this.projectRepository.create({
      ...dto, 
      id: randomBytes(16).toString('hex'),
      user: { /* id: */
      }
    });

    await this.projectRepository.save(project);

    return project;
  }
}
