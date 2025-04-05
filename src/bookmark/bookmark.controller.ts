/* eslint-disable prettier/prettier */
import
    {
        Body,
        Controller,
        Delete,
        Get,
        HttpCode,
        Param,
        ParseIntPipe,
        Patch,
        Post,
        UseGuards,
    } from '@nestjs/common';
import
    {
        ApiBearerAuth,
        ApiCreatedResponse,
        ApiNoContentResponse,
        ApiOkResponse,
        ApiOperation,
        ApiParam,
        ApiResponse,
    } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto, CreateBookmarkDto, EditBookmarkDto } from './dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @ApiOperation({ summary: 'Get all bookmarks for current user' })
  @ApiResponse({
    description: 'Bookmarks retrieved successfully',
    type: [BookmarkDto],
  })
  getBookmarks(@GetUser('id') userId: number) {
    console.log('calling getBookmarks api', userId);

    return this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new bookmark' })
  @ApiCreatedResponse({
    description: 'Bookmark created successfully',
    type: BookmarkDto,
  })
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    console.log('calling createBookmark api', userId, dto);

    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bookmark by ID' })
  @ApiParam({ name: 'id', description: 'Bookmark ID', example: 1 })
  @ApiOkResponse({
    description: 'Bookmark retrieved successfully',
    type: BookmarkDto,
  })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    console.log('calling getBookmarkById api', userId, bookmarkId);

    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update bookmark by ID' })
  @ApiParam({ name: 'id', description: 'Bookmark ID', example: 1 })
  @ApiOkResponse({
    description: 'Bookmark updated successfully',
    type: BookmarkDto,
  })
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    console.log('calling editBookmarkById api', userId, bookmarkId, dto);

    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete('all')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete all bookmarks for current user' })
  @ApiNoContentResponse({
    description: 'All bookmarks deleted successfully',
  })
  deleteAllBookmarks(@GetUser('id') userId: number) {
    console.log('calling deleteAllBookmarks api', userId);
    return this.bookmarkService.deleteAllBookmarks(userId);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete bookmark by ID' })
  @ApiParam({ name: 'id', description: 'Bookmark ID', example: 1 })
  @ApiNoContentResponse({
    description: 'Bookmark deleted successfully',
  })
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    console.log('calling deleteBookmarkById api', userId, bookmarkId);
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
