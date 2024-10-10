import {
  Body,
  Post,
  Controller,
  Get,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Post as PostModel } from '../models/post.model';
import { Tag } from '../models/tag.model';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body('userId', ParseIntPipe) userId: number, 
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{
    post: PostModel,
    tags: Tag[],
  }> {
    return this.postService.addPost(
      userId, 
      createPostDto.header, 
      createPostDto.description, 
      createPostDto.tags,
      image,
    );
  }
}
