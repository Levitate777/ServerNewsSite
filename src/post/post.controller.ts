import {
  Body,
  Post,
  Controller,
  Get,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PostService } from './post.service';
import { Post as PostModel } from '../models/post.model';
import { Tag } from '../models/tag.model';
import { CreatePostDto } from './dto/create-post.dto';
import { RequestWithUser } from '../user/user.controller';
import { JwtAuthguard } from '../guards/jwt-guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }

  @UseGuards(JwtAuthguard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Req() request: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PostModel[]> {
    return this.postService.addPost(
      request.user['user'].id, 
      createPostDto.header, 
      createPostDto.description, 
      createPostDto.tags,
      image,
    );
  }
}
