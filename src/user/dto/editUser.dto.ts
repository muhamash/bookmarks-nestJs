import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EdiTUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'edited@example.com',
    description: 'Email of the user',
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'JohnEdited',
    description: 'First name of the user',
    required: false,
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'JohnEditedLast',
    description: 'Last name name of the user',
    required: false,
  })
  lastName?: string;
}
