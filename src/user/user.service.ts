import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { User } from '../models/user.model';
import { saltOrRounds } from '../consts';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async findOne(login: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { login: login } });
    //console.log('service', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async registerUser(
    login: string,
    pass: string,
    email: string,
  ): Promise<{
    user: User;
    accessToken: string;
  }> {
    const cryptPassword = await bcrypt.hash(pass, saltOrRounds);
    const findUser = await this.userModel.findOne({
      where: { login: login, email: email },
    });
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.userModel.create({
      login: login,
      password: cryptPassword,
      email: email,
    });
    const { password, createdAt, updatedAt, ...user } = newUser.toJSON();
    const accessToken = await this.tokenService.generateJwtToken(user);
    return { user, accessToken };
  }
}
