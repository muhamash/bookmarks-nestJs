import
    {
        ForbiddenException,
        Injectable,
    } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import
    {
        ExtractJwt,
        Strategy,
    } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        config.get<string>('JWT_SECRET')!,
      passReqToCallback: true,
    });
  }

   validate(
    req: Request,
    payload: {
      sub: number;
      email: string;
    },
  ) {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken)
      throw new ForbiddenException(
        'Refresh token malformed',
      );

    return {
      ...payload,
      refreshToken,
    };
  }
}
