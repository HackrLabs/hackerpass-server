import { Controller, Post, Body, Put, Get, Param, Request } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Roles } from '../roles/roles.decorator';
import { Auth } from '../auth/auth.decorator';
import { UserRolesEnum } from '../roles/roles.enum';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRolesEnum.SUPER_ADMIN, UserRolesEnum.SITE_ADMIN)
  @Post()
  async create(@Body() userBody: CreateUserDto): Promise<User> {
    return await this.userService.create(userBody);
  }

  @Put(':id')
  async update(@Body() userBody: UpdateUserDto): Promise<void> {
    try {
      await this.userService.update(userBody);
    } catch (e) {

    }
  }


  @Roles(UserRolesEnum.SUPER_ADMIN, UserRolesEnum.SITE_ADMIN, UserRolesEnum.USER)
  @Get('me')
  @Get(':id')
  async get(@Param() id: string = "me", @Request() req): Promise<User> {
    if (id === "me") id = req.user.id;
    console.log(req.user)
    return await this.userService.get(id);
  }
}
