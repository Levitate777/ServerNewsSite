import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';
import { TagService } from '../tag/tag.service';
import { TagPostService } from '../tagPost/tagPost.service';
import { saveImage } from '../utils/saveImage';

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

  getPostsByUser(userId: number): Promise<Post[]> {
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
      where: {userId: userId},
      attributes: ['id', 'header', 'description', 'image', 'createdAt'],
      order: [['createdAt', 'ASC']],
    });
  }

  async addPost(
    userId: number, 
    header: string, 
    description: string, 
    tags: string,
    image: Express.Multer.File,
  ): Promise<Post[]> {
    const createdTags = await this.tagService.findOrCreateTag(tags);
    const tagsId = createdTags.map((tag) => Number(tag.id));

    const imagePath = await saveImage(
      image,
      this.configService.get('STATIC_PATH'),
      this.configService.get('IMAGE_POST_PATH'),
      String(userId),
    );

    const newPost = await this.postModel.create({ userId: userId, header: header, description: description, image: imagePath });
    const createdTagsPost = await this.tagPostService.createConnection(Number(newPost.dataValues.id), tagsId);

    const postsByUser = await this.getPostsByUser(userId);

    return postsByUser
  }
}
