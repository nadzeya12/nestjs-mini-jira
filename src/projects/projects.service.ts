import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { projectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class ProjectsService {
  constructor (
    @InjectRepository(projectEntity) 
    private readonly projectRepository: Repository<projectEntity>,
  ) {}
  
  async findAllByUser(id: string): Promise<projectEntity[]> {

    const result = await this.projectRepository.find({ 
      where: {
        userId: id
      },
    });

    if(result.length === 0) throw new NotFoundException('User has no projects yet.')
    
    return result;
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
    const result = await this.projectRepository.delete(id);

    if(!result) throw new HttpException('No result', HttpStatus.NOT_FOUND)

    return result;
  }

  async createProject(dto: CreateProjectDto, userId: string): Promise<projectEntity> {

    try {

      const project = this.projectRepository.create({
        ...dto, 
        id: randomBytes(16).toString('hex'),
        user: { id: userId}
      });

      await this.projectRepository.save(project);

      return project;
    } catch (error: any) {
      if (error.message?.includes('unique constraint') || error.detail?.includes('already exists')) {
        throw new ConflictException('Projekt o takim tytule już istnieje!');
      }
      
      throw new InternalServerErrorException('Coś poszło nie tak na serwerze');
    }
  }
}
