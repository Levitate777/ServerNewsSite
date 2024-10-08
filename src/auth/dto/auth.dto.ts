import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthDto {
  @IsString()
  login?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
