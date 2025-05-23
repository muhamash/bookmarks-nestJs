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
      // console.log(
      //   'User created:',
      //   userWithoutHash,
      // );

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
    // console.log('user found', userWithoutHash);

    return this.signToken(
      userWithoutHash.id,
      userWithoutHash.email,
      userWithoutHash.firstName ?? 'No Name',
    );
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
  }

  async refreshToken(
    userId: number,
    refreshToken: string,
  ) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

      if (!user || !user.hashedRefreshToken) {
        throw new ForbiddenException(
          'i will no grant your access!!',
        );
      }

      const tokenMatches = await argon.verify(
        user?.hashedRefreshToken,
        refreshToken,
      );

      if (!tokenMatches)
        throw new ForbiddenException(
          'Invalid refresh token',
        );

      if (tokenMatches)
        return await this.signToken(
          user.id,
          user.email,
          user.firstName ?? 'No Name',
        );
    } catch (error) {
      console.error(
        'Refresh token error:',
        error,
      );
      throw new ForbiddenException(
        'Token expired or invalid',
      );
    }
  }

  async signToken(
    userId: number,
    userEmail: string,
    userName: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
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

    const [accessToken, refreshToken] =
      await Promise.all([
        this.jwt.signAsync(payload, {
          expiresIn: '15m',
          secret: secret,
        }),
        this.jwt.signAsync(payload, {
          expiresIn: '3h',
          secret: secret,
        }),
      ]);

    await this.updateRefreshHash(
      userId,
      refreshToken,
    );

    console.log({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userEmail: userEmail,
      userName: userName,
      userId: userId,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      userEmail: userEmail,
      userName: userName,
      userId: userId,
    };
  }

  private async hashData(
    data: string,
  ): Promise<string> {
    return await argon.hash(data);
  }

  async updateRefreshHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash =
      await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }
}
