import { Transform } from 'class-transformer';
import {
  ValidateIf,
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
  IsStrongPassword
} from "class-validator";

export class AuthDto {
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

  @Length(1, 255)
  @IsString({ message: 'Interior must be a valid string' })
	@IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;
}
