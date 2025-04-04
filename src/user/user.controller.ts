import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
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
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });

    // return 'use info';
    return req.user;
  }
}
