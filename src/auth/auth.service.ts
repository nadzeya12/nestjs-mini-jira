import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { userEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/SignIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor( 
      private usersService: UsersService, 
      private jwtService: JwtService,

      @InjectRepository(userEntity) 
        private readonly authRepository: Repository<userEntity>
      ) {}

    async logIn(email: string, pass:string): Promise<any> {

    const user = await this.usersService.findUsrByUserId(email);

    let isValidPass = await bcrypt.compare(pass, user.password);

    if (!isValidPass) { 
      throw new BadRequestException(
        "invalid password"
      );
    }

    const payload = {userId: user.id, sub: user.id};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: signUpDto): Promise<userEntity> {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const existUser = await this.authRepository
    .createQueryBuilder('user')
    .where('user.email = :email', {email: dto.email})
    .select(['user.id'])  
    .getOne();

    if (existUser) {
      throw new HttpException('User is already exists', HttpStatus.BAD_REQUEST);
    }

    dto.password = await bcrypt.hash(
      dto.password,
      saltRounds
    );

    const user = this.authRepository.create({...dto, id: randomUUID()});

    const savedUser = await this.authRepository.save(user);

    return savedUser;
  }

  async profile(userId: string): Promise<userEntity> {
    return this.usersService.findUsrByUserId(userId);
  }

  async validate(id: string) {
    const user = await this.authRepository.findOne({
      where: {
        id
      },
    });
    
    if (!user) throw new NotFoundException('User not found/authorized');

    return user.id;
  }
}
