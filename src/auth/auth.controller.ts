import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test();
  }

  @Post('signup')
  // signup(@Req() req: Request) {
  //   // return 'i am signUp';
  //   // return {
  //   //   message: 'signup route!!',
  //   //   status: 'ok',
  //   // };
  //   console.log(req.body);
  //   return this.authService.signup(req.body);
  // }
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });

    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    // return 'i am signIn';
    return this.authService.signin(dto);
  }
}
