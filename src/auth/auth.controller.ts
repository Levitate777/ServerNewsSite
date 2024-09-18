import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
