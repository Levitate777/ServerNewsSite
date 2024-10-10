import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tag } from '../models/tag.model';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
    imports: [SequelizeModule.forFeature([Tag])],
    providers: [TagService],
    controllers: [TagController], 
    exports: [TagService],
})
export class TagModule {}
