import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor (
  @InjectRepository(userEntity) 
  private readonly userRepository: Repository<userEntity>
) {}

  async create(dto: CreateUserDto): Promise<userEntity> {

    const saltRounds = 10;
    const userId = dto.id;
    const existUser = await this.userRepository
    .createQueryBuilder('user')
    .where('user.userId = :userId', {userId})
    .select([ 'user.userId'])
    .getOne();

    if (existUser) {
      throw new HttpException('User is already exists', HttpStatus.BAD_REQUEST);
    }

    dto.password = await bcrypt.hash(
      dto.password,
      saltRounds
    );

    const user = this.userRepository.create(dto);

    await this.userRepository.save(user);
    
    return user;
  }
}
