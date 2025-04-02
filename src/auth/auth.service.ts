import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  signup() {
    // return 'i am signup responding the text';
    return {
      message: 'sign up responding',
      status: 'ok',
    };
  }
}
