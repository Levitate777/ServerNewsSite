import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Post } from '../models/post.model';
import { PostService } from './post.service';
import { JwtAuthguard } from '../guards/jwt-guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @UseGuards(JwtAuthguard)
  @Get('byUser')
  getPostsByUser(@Query('userId', ParseIntPipe) userId: number): Promise<Post[]> {
    return this.postService.getPostsByUser(userId);
  }
}
