// import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import {JwtService} from '@nestjs/jwt'

// @Injectable()
// export class AuthService {
//     constructor( 
//       private usersService: UsersService, 
//     ) {}

//   async validateUser(username: string, pass: string) {
//     const user = await this.usersService.findOne(username);

//     if( user && bcrypt.compare(pass, user.password)) {
//       const {password, ...result} = user;
//       return result
//     }
//     return HttpStatus.FORBIDDEN;
//   }

//     //async signIn( username: string, pass: string,): 
//     //Promise<{ access_token: string }> {

//     //const user = await this.usersService.findOne(username);

//     // if () {
//     //   throw new UnauthorizedException();
//     // }

//     //const payload = { sub: user.userId, username: user.username };
//     //return {
//       // 💡 Here the JWT secret key that's used for signing the payload 
//       // is the key that was passed in the JwtModule

//       //access_token: await this.jwtService.signAsync(payload),
//     //};
//   //}
// }
