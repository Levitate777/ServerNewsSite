import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Dialect } from 'sequelize';

import { PostModule } from './post/post.module';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { Tag } from './models/tag.model';
import { TagPost } from './models/tag-post.model';
import { UserModule } from './ user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

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
    UserModule,
    AuthModule,
    TokenModule,
  ],
})
export class AppModule {}
