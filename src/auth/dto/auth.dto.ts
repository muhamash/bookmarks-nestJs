import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Allow both strings and numbers as passwords
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Password must be a string or a number',
  }) // Alphanumeric check
  password: string | number;
}
