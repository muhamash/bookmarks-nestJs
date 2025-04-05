import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// @ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test();
  }

  // @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'User profile created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden request',
  })
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
    // console.log({
    //   dto,
    // });

    return this.authService.signup(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Not found',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    // return 'i am signIn';
    return this.authService.signin(dto);
  }
}
