import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule} from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from '../users/entities/user.entity';

@Module({
    imports: 
    [
        TypeOrmModule.forFeature([userEntity]),
        ConfigModule
    ],
    providers: [
        AuthService,
        UsersService
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}