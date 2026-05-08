import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { userEntity } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, 
    TypeOrmModule.forFeature([userEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      synchronize: true,
      host: configService.getOrThrow('POSTGRES_HOST'),
      port: 5432,
      username: 'postgres',
      password: '987654321',
      database: 'nestjs'
    }),
    inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
