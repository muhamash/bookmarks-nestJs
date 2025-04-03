import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  //   test() {
  //     return 'this is a test function in auth service';
  //   }

  constructor(private prisma: PrismaService) {}

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials not found!!!');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Password incorrect!!!');
    }

    const { hash, ...userWithoutHash } = user;

    // return userWithoutHash;

    // return {
    //   message: 'signin route auth service!!',
    //   status: 'ok',
    //   data: userWithoutHash,
    // };

    console.log('user found', userWithoutHash, user);
    return userWithoutHash;
  }

  async signup(dto: AuthDto) {
    // return 'i am signup responding the text';
    // generate the has password then save to the db
    try {
      const hashPass = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashPass,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      // delete user.hash;

      // console.log('user created', user);
      // return user;
      const { hash, ...userWithoutHash } = user;

      console.log('User created:', userWithoutHash);
      return userWithoutHash;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'this credential already regiostered into database',
          );
        }
      }

      throw error;
    }
    // return {
    //   message: 'sign up responding',
    //   status: 'ok',
    //   dto,
    // };
  }
}
