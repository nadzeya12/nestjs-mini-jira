import { Module } from '@nestjs/common';
//import { UsersModule } from '../users/users.module'; 
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: 
    [
        TypeOrmModule.forFeature([userEntity]),
        JwtModule.registerAsync({
            imports: [
                ConfigModule,
                PassportModule
            ],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: process.env.JWT_SECRET
                };
            },
            inject: [ConfigService],
            global: true
        }),
        JwtModule.register({
            signOptions: { expiresIn: '60s' },
        }),
        ConfigModule
    ],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
        AuthService,
        UsersService
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}