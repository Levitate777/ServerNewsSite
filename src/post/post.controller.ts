import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
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
  getPostsByUser(@Body('userId', ParseIntPipe) userId: number): Promise<Post[]> {
    console.log(typeof userId);
    
    return this.postService.getPostsByUser(userId);
  }
}
