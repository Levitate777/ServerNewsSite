import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from '../models/post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TagModule } from '../tag/tag.module';
import { TagPostModule } from '../tagPost/tagPost.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), TagModule, TagPostModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
