import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description:
      'User password (must be at least 8 characters, contain one letter, one number, and one special character)',
  })
  @IsNotEmpty()
  @IsString()
  // @Matches(/^[a-zA-Z0-9]+$/, {
  //   message: 'Password must be a string or a number',
  // }) // Alphanumeric check
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
