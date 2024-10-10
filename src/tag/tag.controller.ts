import { Body, Controller, Post } from "@nestjs/common";

import { TagService } from "./tag.service";
import { Tag } from "../models/tag.model";

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

	@Post()
	findOrCreate(@Body('tags') tags: string): Promise<Tag[]> {
		return this.tagService.findOrCreateTag(tags);
	}
}