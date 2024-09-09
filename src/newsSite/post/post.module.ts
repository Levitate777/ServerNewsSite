import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from '../models/post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';
import { TagPost } from '../models/tag-post.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, User, Tag, TagPost])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
