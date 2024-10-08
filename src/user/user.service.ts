import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/user.model';
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
}
