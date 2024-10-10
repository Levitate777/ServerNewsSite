import { IsNotEmpty, IsString, Length } from "class-validator";
import { Transform } from 'class-transformer';

export class CreatePostDto {
	@Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' ').trim())
	@IsString({ message: 'Title must be a valid string' })
	header: string;

	@IsNotEmpty({ message: 'Text must not be empty' })
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' ').trim())
	@IsString({ message: 'Description must be a valid string' })
	description: string;

  @Length(1, 255, { message: 'Tags must be between 1 and 255 characters' })
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' ').trim())
  @IsString({ message: 'Tags must be a valid string' })
  tags: string;
}
