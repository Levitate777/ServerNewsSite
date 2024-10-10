import { extname, join, resolve } from 'path';
import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';
import { TagService } from '../tag/tag.service';
import { TagPostService } from '../tagPost/tagPost.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    private readonly tagService: TagService, 
    private readonly tagPostService: TagPostService,
    private readonly configService: ConfigService,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        { model: User, attributes: ['login', 'avatar'] },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'header', 'description', 'image', 'createdAt'],
      order: [['createdAt', 'ASC']],
    });
  }

  async saveImageByPost(image: Express.Multer.File | undefined): Promise<string> {
    if (!image) return undefined;

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtName = extname(image.originalname);
    const imageName = `${uniqueSuffix}${fileExtName}`;

    const imagePath = join(
      this.configService.get('STATIC_PATH'),
      this.configService.get('IMAGE_POST_PATH'),
      imageName,
    );
    const directoryPath = join(
      __dirname,
      '..',
      '..',
      this.configService.get('STATIC_PATH'),
      this.configService.get('IMAGE_POST_PATH'),
    );
    console.log('imagePath ', imagePath);

    await fs.mkdir(directoryPath, { recursive: true });
    console.log('directoryPath ', directoryPath);

    await fs.writeFile(join(directoryPath, imageName), image.buffer);

    return imagePath.replace(/\\/g, '/');
  }

  async addPost(
    userId: number, 
    header: string, 
    description: string, 
    tags: string,
    image: Express.Multer.File,
  ): Promise<{
    post: Post,
    tags: Tag[],
  }> {
    const createdTags = await this.tagService.findOrCreateTag(tags);
    //console.log('createdTags ', createdTags);
    
    const tagsId = createdTags.map((tag) => Number(tag.id));
    //console.log('tagsId ', tagsId);

    const imagePath = await this.saveImageByPost(image);
    console.log('imagePath from add', imagePath);

    const newPost = await this.postModel.create({ userId: userId, header: header, description: description, image: imagePath });
    console.log('newPost ', newPost.dataValues);
    
    const createdTagsPost = await this.tagPostService.createConnection(Number(newPost.dataValues.id), tagsId);
    console.log('createdTagsPost ', createdTagsPost);
    
    return { ...newPost.dataValues, createdTags }
  }
}
