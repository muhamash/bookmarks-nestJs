import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  //   test() {
  //     return 'this is a test function in auth service';
  //   }

  constructor(private prisma: PrismaService) {}

  signin() {
    return {
      message: 'signin route auth service!!',
      status: 'ok but empty',
    };
  }

  async signup(dto: AuthDto) {
    // return 'i am signup responding the text';
    // generate the has password then save to the db
    const hashPass = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashPass,
      },
    });

    console.log('user created', user);
    return user;
    // return {
    //   message: 'sign up responding',
    //   status: 'ok',
    //   dto,
    // };
  }
}
