import
  {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import
  {
    CreateBookmarkDto,
    EditBookmarkDto,
  } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    console.log(
      'creating bookmark with userId:',
      userId,
      'and dto:',
      dto,
    );
    return this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });

    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found',
      );
    }

    return bookmark;
  }

  editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });

    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found or does not belong to user',
      );
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });

    return {
      message: 'Bookmark deleted successfully',
      bookmarkId,
    };
  }

  async deleteAllBookmarks(userId: number) {
    const result =
      await this.prisma.bookmark.deleteMany({
        where: {
          userId,
        },
      });

    return {
      message: `${result.count} bookmark(s) deleted`,
      deletedCount: result.count,
    };
  }
}
