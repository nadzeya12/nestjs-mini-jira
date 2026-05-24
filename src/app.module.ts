import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { userEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ProjectsModule } from './projects/projects.module';
import { projectEntity } from './projects/entities/project.entity';
import { ProjectsService } from './projects/projects.service';
import { ProjectsController } from './projects/projects.controller';
import { TasksModule } from './tasks/tasks.module';
import { tasksEntity } from './tasks/entities/task.entity';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forFeature([userEntity, projectEntity, tasksEntity
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
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' },
                  };
              },
              inject: [ConfigService],
              global: true
          }),
  TasksModule,
  ProjectsModule,
  AuthModule,
  ConfigModule
  ],
  controllers: [AppController, AuthController, ProjectsController, TasksController],
  providers: [
    AppService, 
    AuthService, 
    UsersService,
    ProjectsService
  ],

})
export class AppModule {}
