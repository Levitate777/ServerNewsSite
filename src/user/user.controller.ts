import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':login')
  findOne(@Param('login') login: string): Promise<User | undefined> {
    return this.userService.findOne(login);
  }

  @Post()
  registerUser(
    @Body('login') login: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.userService.registerUser(login, password, email);
  }
}
