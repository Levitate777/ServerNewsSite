import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { User } from '../models/user.model';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthguard } from '../guards/jwt-guard';

export type RequestWithUser = Request & { user: User };

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthguard)
  @Get('whoIsThis')
  whoIsThis(@Req() request: RequestWithUser): User {
    return request.user['user'];
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
