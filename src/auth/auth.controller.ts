import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test();
  }

  @Post('signup')
  signup() {
    // return 'i am signUp';
    return {
      message: 'signup route!!',
      status: 'ok',
    };
  }

  @Post('signin')
  signin() {
    return 'i am signIn';
  }
}
