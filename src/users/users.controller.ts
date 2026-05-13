import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { userEntity } from './entities/user.entity';
//import { Public } from '../auth/auth.guard';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   //@Public()
//   // @Post('register') 
//   //   async signUp (@Body() CreateUserDto: CreateUserDto): Promise<userEntity> {
//   //     return this.usersService.create (CreateUserDto);
//   //   } 
// }
