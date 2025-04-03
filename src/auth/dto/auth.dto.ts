import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Allow both strings and numbers as passwords
  @IsNotEmpty()
  @IsString()
  // @Matches(/^[a-zA-Z0-9]+$/, {
  //   message: 'Password must be a string or a number',
  // }) // Alphanumeric check
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
