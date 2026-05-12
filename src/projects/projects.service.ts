// import { Injectable, NotFoundException } from '@nestjs/common';
// import { projectEntity } from './entities/project.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateProjectDto } from './dto/create.Post.dto';

// @Injectable()
// export class ProjectsService {
//     constructor (
//       @InjectRepository(projectEntity) 
//       private readonly projectRepository: Repository<projectEntity>
//     ) {}

//     async findAll(): Promise<projectEntity[]> {
//         return await this.projectRepository.find()
//     }

//     async findById(id: string): Promise<projectEntity> {
//         const project = await this.projectRepository.findOne({
//           where: {
//             id,
//           },
//         });
//         if(!project) throw new NotFoundException('Project not found')
    
//         return project;
//       }

//     async createProject(dto: CreateProjectDto): Promise<projectEntity> {
//         const project = this.projectRepository.create(dto);

//         return await this.projectRepository.save(project);
//     }
// }
