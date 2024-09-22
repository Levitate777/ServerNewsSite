import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { User } from '../models/user.model';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async login(
    email: string,
    pass: string,
  ): Promise<{
    user: User;
    accessToken: string;
  }> {
    const findUser = await this.userModel.findOne({
      where: { email: email },
      attributes: ['id', 'login', 'email', 'avatar', 'password'],
    });
    if (!findUser) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(pass, findUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    const { password, ...user } = findUser.toJSON();
    const accessToken = await this.tokenService.generateJwtToken(user);
    return { user, accessToken };
  }
}
