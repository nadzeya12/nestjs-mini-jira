import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor (
  @InjectRepository(userEntity) 
  private readonly userRepository: Repository<userEntity>
) {}
  
  async findAll(): Promise<userEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', {id})
    .getOne();

    return user;
  }

  async findUsrByUserId (email: string): Promise<userEntity> {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', {email})
    .getOne();

    if (!user) {
    throw new NotFoundException('User with id ${id} not found')
  }
  return user;
  }
}
