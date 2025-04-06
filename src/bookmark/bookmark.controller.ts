/* eslint-disable prettier/prettier */
import
  {
    Body,
    Controller,
    Delete,
    Get,
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
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
  } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../common/decorator';
import { BookmarkService } from './bookmark.service';
import
  {
    BookmarkDto,
    CreateBookmarkDto,
    EditBookmarkDto,
  } from './dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Get()
  @ApiOperation({
    summary: 'Get all bookmarks for current user',
  })
  @ApiResponse({
    description:
      'Bookmarks retrieved successfully',
    type: [BookmarkDto],
  })
  getBookmarks(@GetUser('id') userId: number) {
    console.log(
      'calling getBookmarks api',
      userId,
    );

    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create new bookmark',
  })
  @ApiCreatedResponse({
    description: 'Bookmark created successfully',
    type: BookmarkDto,
  })
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    console.log(
      'calling createBookmark api',
      userId,
      dto,
    );

    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bookmark by ID' })
  @ApiParam({
    name: 'id',
    description: 'Bookmark ID',
    example: 1,
  })
  @ApiOkResponse({
    description:
      'Bookmark retrieved successfully',
    type: BookmarkDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Bookmark not found',
  })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    console.log(
      'Calling getBookmarkById API:',
      userId,
      bookmarkId,
    );
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update bookmark by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Bookmark ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Bookmark updated successfully',
    type: BookmarkDto,
  })
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    console.log(
      'calling editBookmarkById api',
      userId,
      bookmarkId,
      dto,
    );

    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete all bookmarks of user',
  })
  @ApiOkResponse({
    description: 'All user bookmarks deleted',
  })
  async deleteAllBookmarks(
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.deleteAllBookmarks(
      userId,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a bookmark by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Bookmark ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Bookmark deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Bookmark not found',
  })
  async deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
