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
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    console.log('calling getBookmarks api', userId);

    return this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    console.log('calling createBookmark api', userId, dto);

    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    console.log('calling getBookmarkById api', userId, bookmarkId);

    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Patch(':id')
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
  deleteAllBookmarks(@GetUser('id') userId: number) {
    console.log('calling deleteAllBookmarks api', userId);
    return this.bookmarkService.deleteAllBookmarks(userId);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    console.log('calling deleteBookmarkById api', userId, bookmarkId);
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
