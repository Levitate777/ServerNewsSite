import { Controller, Post, Body } from "@nestjs/common";

import { TagPostService } from "./tagPost.service";
import { TagPost } from "../models/tag-post.model";

@Controller('tag-post')
export class TagPostController {
	constructor(private readonly tagPostService: TagPostService) {}

	@Post()
	createTagPostConnection(@Body('postId') postId: number, @Body('tagsId') tagsId: number[]): Promise<TagPost[]> {
		return this.tagPostService.createConnection(postId, tagsId);
	}
}
