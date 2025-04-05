// src/bookmark/dto/bookmark.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BookmarkDto {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({
    example: 'NestJS Documentation',
    description: 'Bookmark title',
  })
  title: string;

  @ApiProperty({
    example: 'Official NestJS documentation',
    description: 'Bookmark description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'https://docs.nestjs.com',
    description: 'Bookmark URL',
  })
  link: string;

  @ApiProperty({
    example: 1,
    description: 'User ID who owns the bookmark',
  })
  userId: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
