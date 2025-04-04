import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  getMe(@GetUser() user: User) {
    console.log({
      user: user,
    });

    // return 'use info';
    return user;
  }

  @Patch()
  editUser() {}
}
