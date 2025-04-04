import { AuthDto } from '@/auth/dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
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
    await app.listen(3303);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3303');
  });

  afterAll(async () => {
    await app.close();
  });

  // it.todo('should have a test');
  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        email: 'ash@test.pactum',
        password: '123456',
        firstName: 'Ash',
        lastName: 'Ketchum',
      };

      it('should throw if no password', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ email: dto.email })
          .expectStatus(400)
          .expectBodyContains('password should not be empty')
          .inspect();
      });

      it('should throw if no email', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ password: dto.password })
          .expectStatus(400)
          .expectBodyContains('email should not be empty')
          .inspect();
      });

      it('should throw if no body', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .expectStatus(400)
          .expectBodyContains('email should not be empty')
          .expectBodyContains('password should not be empty')
          .inspect();
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Signin', () => {
      const dto: AuthDto = {
        email: 'ash@test.pactum',
        password: '123456',
        firstName: 'Ash',
        lastName: 'Ketchum',
      };

      it('should throw if no password', () => {
        return pactum
          .spec()
          .post(`/auth/signin`)
          .withBody({ email: dto.email })
          .expectStatus(400)
          .expectBodyContains('password should not be empty')
          .inspect();
      });

      it('should throw if no email', () => {
        return pactum
          .spec()
          .post(`/auth/signin`)
          .withBody({ password: dto.password })
          .expectStatus(400)
          .expectBodyContains('email should not be empty')
          .inspect();
      });

      it('should throw if no body', () => {
        return pactum
          .spec()
          .post(`/auth/signin`)
          .expectStatus(400)
          .expectBodyContains('email should not be empty')
          .expectBodyContains('password should not be empty')
          .inspect();
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post(`/auth/signin`)
          .withBody(dto)
          .expectStatus(200)
          .inspect();
      });
    });
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
