import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Tag } from "../models/tag.model";

@Injectable()
export class TagService {
	constructor(
		@InjectModel(Tag)
		private readonly tagModel: typeof Tag,
	) {}

	findOrCreateTag(tags: string): Promise<Tag[]> {
		const tagArray = tags.split(/\s*,\s*/);
		
		const resultfindOrCreate = tagArray.map( async (name) => {
			const tag = await this.tagModel.findOrCreate({ where: { name: name } });
			return tag[0].dataValues;
		}) 

		return Promise.all(resultfindOrCreate);
	}
}
