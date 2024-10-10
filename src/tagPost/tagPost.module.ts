import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { TagPost } from "../models/tag-post.model";
import { TagPostService } from "./tagPost.service";
import { TagPostController } from "./tagPost.controller";

@Module({
	imports: [SequelizeModule.forFeature([TagPost])],
	providers: [TagPostService],
	controllers: [TagPostController],
	exports: [TagPostService],
})
export class TagPostModule {}
