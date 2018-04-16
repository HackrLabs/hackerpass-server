import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [UserService],
  controllers: [UsersController, UserController],
  exports: [UserService, User]
})
export class UsersModule {}
