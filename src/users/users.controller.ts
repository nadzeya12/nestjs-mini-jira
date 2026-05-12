// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { userEntity } from './entities/user.entity';
// import { Public } from '../auth/auth.guard';
// import { loginDto, signInDto } from '../auth/dto/SignIn.dto';
// import { AuthService } from '../auth/auth.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Public()
//   @Post('register') 
//     async signUp (@Body() signInDto: signInDto): Promise<userEntity> {
//       return AuthService.create(signInDto);
//     } 
// }
