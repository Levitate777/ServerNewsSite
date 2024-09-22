import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
