import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { loginDto} from '../auth/dto/SignIn.dto';

@Injectable()
export class UsersService {

  constructor (
  @InjectRepository(userEntity) 
  private readonly userRepository: Repository<userEntity>
) {}

  async findById(id: UUID): Promise<userEntity> {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      throw new NotFoundException('User with id ${id} not found');
    }

    return user;
  }

  async findUsrByUserId(id: string): Promise<userEntity> {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.userId = :userId',{id})
    .getOne();

    if (!user) {
      throw new NotFoundException('User with id ${id} not found');
    }

    return user;
  }

  async create(dto: loginDto): Promise<userEntity> {

    const saltRounds = 10;
    const userId = dto.userId;
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
