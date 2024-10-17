import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { PostService } from '../post/post.service';

interface IChanges {
  login?: string,
  email?: string,
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly postService: PostService,
  ) {}

  async whoIsThis(id: number): Promise<{
    user: User;
    posts: Post[];
  }> {
    const getUser = await this.findOne(id);
    const postsByUser = await this.postService.getPostsByUser(id);
    delete getUser.dataValues.password;

    return { user: getUser, posts: postsByUser };
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, login: string, email: string): Promise<User> {
    const changes: IChanges = {};

    if (login !== undefined) {
      changes.login = login;
    }
    if (email !== undefined) {
      changes.email = email;
    }
    
    const updateUser = this.userModel.update(changes, {where: {id: id}});
    const getUser = await this.findOne(id);

    return getUser;
  }
}
