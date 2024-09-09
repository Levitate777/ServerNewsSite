import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postModel.findAll({
      order: [['id', 'ASC']],
    });
  }
}
