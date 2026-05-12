import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { userEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') 
    async signUp (@Body() CreateUserDto: CreateUserDto): Promise<userEntity> {
      return this.usersService.create (CreateUserDto);
    } 
}
