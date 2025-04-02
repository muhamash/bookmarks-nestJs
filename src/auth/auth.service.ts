import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  //   test() {
  //     return 'this is a test function in auth service';
  //   }

  signin() {
    return {
      message: 'signin route auth service!!',
      status: 'ok but empty',
    };
  }

  signup() {
    return 'i am signIn';
  }
}
