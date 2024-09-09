import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Dialect } from 'sequelize';

import { PostModule } from './newsSite/post/post.module';
import { Post } from './newsSite/models/post.model';
import { User } from './newsSite/models/user.model';
import { Tag } from './newsSite/models/tag.model';
import { TagPost } from './newsSite/models/tag-post.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [Post, User, Tag, TagPost],
      }),
      inject: [ConfigService],
    }),
    PostModule,
  ],
})
export class AppModule {}
