import
  {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
import
  {
    ApiBearerAuth,
    ApiResponse,
  } from '@nestjs/swagger';
import { GetUser } from '../common/decorator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtGuard, RtGuard } from './guard';

// @ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test();
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description:
      'User profile created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden request',
  })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // console.log({
    //   dto,
    // });

    return this.authService.signup(dto);
  }

  @ApiResponse({
    status: 200,
    description:
      'User profile retrieved successfully',
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden request',
  })
  logout(@GetUser('id') userId: number) {
    console.log(
      'logging out the userId:',
      userId,
    );

    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description:
      'User refresh token successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden request',
  })
  refreshToken(
    @GetUser('sub') userId: number,
    @GetUser('refreshToken')
    refreshToken: string,
  ) {
    console.log(
      refreshToken,
      userId,
      'refreshing token',
    );

    return this.authService.refreshToken(
      userId,
      refreshToken,
    );
  }
}
