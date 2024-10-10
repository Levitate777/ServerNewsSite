import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { TagPost } from "../models/tag-post.model";

@Injectable()
export class TagPostService {
	constructor(
		@InjectModel(TagPost)
		private readonly tagPostModel: typeof TagPost,
	) {}

	createConnection(postId: number, tagsId: number[]): Promise<TagPost[]> {
		if (!postId) {
			throw new BadRequestException('Post Id is missing');
		}
		if (!tagsId.length) {
			throw new BadRequestException('Tags Id is missing');
		}
		
		const tagsPost = tagsId.map(async (tagId) => {
			const connect = await this.tagPostModel.create({ postId: postId, tagId: tagId });
			return connect.dataValues;
		})

		return Promise.all(tagsPost);
	}
}
