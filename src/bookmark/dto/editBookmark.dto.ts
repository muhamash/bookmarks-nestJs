import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @ApiProperty({
    description: 'Updated title of the bookmark',
    required: false,
    example: 'Updated Bookmark Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Updated description of the bookmark',
    required: false,
    example: 'Updated description content',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Updated URL link for the bookmark',
    required: false,
    example: 'https://updated.example.com',
  })
  @IsString()
  @IsOptional()
  link?: string;
}
