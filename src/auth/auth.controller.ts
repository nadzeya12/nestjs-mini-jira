import { Controller, HttpCode, HttpStatus, Body, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signUpDto } from './dto/SignIn.dto';
import { userEntity } from '../users/entities/user.entity';
//import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('register') 
  async signUp(@Body() signUpDto: signUpDto): Promise<userEntity> {
    return this.authService.signUp(signUpDto);
  } 

  @Post('login')
    async signIn(@Body() logInDto: loginDto): Promise<userEntity> {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }
}

