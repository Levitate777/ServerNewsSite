import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        { model: User, attributes: ['login'] },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'header', 'description', 'image', 'created_at'],
      order: [['created_at', 'ASC']],
    });
  }
}
