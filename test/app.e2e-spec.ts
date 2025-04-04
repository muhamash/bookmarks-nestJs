import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        // transform: true,
      }),
    );

    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  // it.todo('should have a test');
  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('should signup');
      it.todo('should throw error if email is already taken');
      it.todo('should throw error if password is too short');
      it.todo('should throw error if password is too weak');
      it.todo('should throw error if email is invalid');
    });
    describe('Signin', () => {});
  });

  describe('User', () => {
    describe('Get Me', () => {});
    describe('Edit user', () => {});
  });

  describe('Bookmark', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmark by Id', () => {});
    describe('Get All Bookmarks', () => {});
    describe('Edit Bookmark', () => {});
    describe('Delete Bookmark', () => {});
    describe('Delete All Bookmarks', () => {});
  });
});
