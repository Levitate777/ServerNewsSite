import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from '../models/user.model';
import { Post as PostModel } from '../models/post.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('registration')
  registerUser(@Body() registerDto: AuthDto): Promise<{
    user: User;
    accessToken: string;
    posts: PostModel[];
  }> {
    return this.authService.registration(registerDto.login, registerDto.password, registerDto.email);
  }
}
