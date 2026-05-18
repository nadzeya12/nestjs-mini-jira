import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { projectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class ProjectsService {
  constructor (
    @InjectRepository(projectEntity) 
    private readonly projectRepository: Repository<projectEntity>
  ) {}
  
  async findAllByUser(userId: string): Promise<projectEntity[]> {
    return await this.projectRepository.find({
      where: { userId: userId}
    })
  }

  async findById(id: string): Promise<projectEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        id: id,
      },
    });

    if(!project) throw new NotFoundException('Project not found')

    return project;
  }

  async deleteProject(id: string) {
    const project = this.projectRepository.findOneByOrFail({id});

    if(!project) throw new NotFoundException('Project with id: ${id} not found');

    await this.projectRepository.delete(id);

    return HttpStatus.NO_CONTENT;
  }

  async createProject( userId: string, dto: CreateProjectDto): Promise<projectEntity> {

    const project = this.projectRepository.create({
      ...dto, 
      id: randomBytes(16).toString('hex'),
      user: { id: userId}
    });

    await this.projectRepository.save(project);

    return project;
  }
}
