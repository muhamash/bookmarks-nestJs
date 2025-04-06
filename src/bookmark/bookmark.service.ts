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

  deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }

  deleteAllBookmarks(userId: number) {
    return this.prisma.bookmark.deleteMany({
      where: {
        userId,
      },
    });
  }
}
