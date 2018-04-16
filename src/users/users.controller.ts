import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  list(): Promise<User[]> {
    return this.userService.findAll();
  }
}
