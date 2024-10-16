import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../models/user.model';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
