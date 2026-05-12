import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';

export type User = any;

@Injectable()
export class UsersService {

  constructor (
  @InjectRepository(userEntity) 
  private readonly userRepository: Repository<userEntity>
) {}
  
  async findAll(): Promise<userEntity[]> {
    return await this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    
    return await this.userRepository.save(user);
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(username: string) {
  //   return `This action returns a #${username} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
