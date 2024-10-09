import { Transform } from 'class-transformer';
import { ValidateIf, IsNotEmpty, IsEmail, IsString, Length, Matches } from "class-validator"

export class UpdateUserDto {
	@Length(1, 255)
	@Transform(({ value }) => value.replace(/\s+/g, ' ').trim())
  @ValidateIf((o) => o.login !== undefined)
  @IsNotEmpty({ message: 'Login should not be empty' })
	login?: string

  @Length(1, 255)
  @Matches(/^\S*$/, { message: 'Email with spaces' })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Interior must be a valid string' })
  @IsEmail({}, { message: 'Invalid email format' })
	email?: string
}
