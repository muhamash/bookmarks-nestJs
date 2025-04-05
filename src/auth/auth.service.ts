/* eslint-disable @typescript-eslint/no-unused-vars */
import
  {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials not found!!!',
      );
    }

    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    if (!pwMatches) {
      throw new ForbiddenException(
        'Password incorrect!!!',
      );
    }

    const { hash, ...userWithoutHash } = user;
    // console.log('user found', userWithoutHash, 'with pass', user);

    return this.signToken(
      userWithoutHash.id,
      userWithoutHash.email,
      userWithoutHash.firstName ?? 'No Name',
    );
  }

  async signup(dto: AuthDto) {
    try {
      const hashPass = await argon.hash(
        dto.password,
      );
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashPass,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      const { hash, ...userWithoutHash } = user;
      console.log(
        'User created:',
        userWithoutHash,
      );

      return {
        userId: userWithoutHash.id,
        userEmail: userWithoutHash.email,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'This credential already registered into database',
          );
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    userEmail: string,
    userName: string,
  ): Promise<{
    accessToken: string;
    userEmail: string;
    userName: string;
    userId: number;
  }> {
    const payload = {
      sub: userId,
      userEmail,
    };

    const secret =
      this.config.get<string>('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '50m',
        secret: secret,
      },
    );

    return {
      accessToken: token,
      userEmail: userEmail,
      userName: userName,
      userId: userId,
    };
  }

  logout() {}

  refresh() {}
}
