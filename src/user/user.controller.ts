import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { User } from '../models/user.model';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthguard } from '../guards/jwt-guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthguard)
  @Post()
  updateUser(
    @Body('id') id: number, 
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto.login, updateUserDto.email);
  }
}
