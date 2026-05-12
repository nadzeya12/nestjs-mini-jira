import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { userEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
// import { ProjectsModule } from './projects/projects.module';
// import { projectEntity } from './projects/entities/project.entity';
// import { TasksModule } from './tasks/tasks.module';
// import { tasksEntity } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forFeature([userEntity,//projectEntity, tasksEntity
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: configService.getOrThrow('POSTGRES_HOST'),
      port: configService.getOrThrow('POSTGRES_PORT'),
      username: 'postgres',
      password: configService.getOrThrow('POSTGRES_PASSWORD'),
      database: 'nestjs'
    }),
    inject: [ConfigService],
  }),
  JwtModule.registerAsync({
              imports: [ConfigModule],
              useFactory: async (configService: ConfigService) => {
                  return {
                      secret: 'mnkdjs8sdnihjn33kmcks9',
                  };
              },
              inject: [ConfigService],
              global: true
          }),
          JwtModule.register({
              signOptions: { expiresIn: '60s' },
          }),
  //TasksModule,
  //ProjectsModule,
  //UsersModule,
  AuthModule,
  ConfigModule
  ],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  AppService, 
  AuthService, 
  UsersService],

})
export class AppModule {}
