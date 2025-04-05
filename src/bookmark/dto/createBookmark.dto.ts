import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'Title of the bookmark',
    example: 'Important Resource',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Optional description for the bookmark',
    required: false,
    example: 'This resource contains crucial documentation',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL link to the resource',
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
