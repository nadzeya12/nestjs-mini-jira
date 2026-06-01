import { Controller, Body, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signUpDto } from './dto/SignIn.dto';
import { userEntity } from '../users/entities/user.entity';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
      summary: "Register a user"
    })
    @ApiCreatedResponse({
      description: "Ok! User created.",
      example: {
    "id": "a27fea2d-31f3-43b7-b505-8aec5b108832",
    "email": "qwerwerty@gmail.com",
    "password": "$2b$10$NCoYaTOTXrOFRyKJiPb0muAJn2rOGiVfDE7ZEDQe89hUdaPwDk9dO",
    "createdAt": "2026-05-29T12:04:01.968Z"
      }
    })
    @ApiBadRequestResponse({
      description: "Bad Request. Email is already in use. Try to logIn or provide an another one email adress"
    })
  @Post('register') 
  async signUp(@Body() signUpDto: signUpDto): Promise<userEntity> {
    return this.authService.signUp(signUpDto);
  } 

  @ApiOperation({
      summary: "Register a user"
    })
    @ApiCreatedResponse({
      description: "Ok! User loginned",
      example: {
        "token": "your access token"
      }
    })
    @ApiBadRequestResponse({
      description: "Bad Request. Password/email is invalid."
    })
  @Post('login')
    async signIn(@Body() logInDto: loginDto): Promise<userEntity> {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }
}

