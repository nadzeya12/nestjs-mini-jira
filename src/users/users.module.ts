import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { userEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  providers: [UsersService],
})
export class UsersModule {}