import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

import { User } from '../models/user.model';
import { TokenService } from '../token/token.service';
import { saveImage } from 'src/utils/saveImage';

interface IChanges {
  login?: string,
  email?: string,
  avatar?: string,
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userModel.findOne({
      where: { id: id },
      attributes: ['id', 'login', 'email', 'avatar'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    id: number,
    login: string,
    email: string,
    avatar: Express.Multer.File | undefined,
  ): Promise<User> {
    const changes: IChanges = {};

    if (login !== undefined) {
      changes.login = login;
    }
    if (email !== undefined) {
      changes.email = email;
    }
    if (avatar !== undefined) {
      const avatarPath = await saveImage(
        avatar,
        this.configService.get('STATIC_PATH'),
        this.configService.get('AVATAR_PATH'),
      )

      changes.avatar = avatarPath;
    }
    
    const updateUser = this.userModel.update(changes, {where: {id: id}});
    const getUser = await this.findOne(id);

    return getUser;
  }
}
