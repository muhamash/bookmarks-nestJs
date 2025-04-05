import
  {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards,
  } from '@nestjs/common';
import
  {
    ApiBearerAuth,
    ApiResponse,
  } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../common/decorator';
import { EdiTUserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description:
      'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Invalid or missing token',
  })
  getMe(@GetUser() user: User) {
    // return 'use info';
    return user;
  }

  @Patch('me')
  @ApiResponse({
    status: 200,
    description:
      'User profile updated successfully',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to edit this user',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error - An unexpected error occurred',
  })
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EdiTUserDto,
  ) {
    console.log('Extracted userId:', userId);
    console.log('DTO:', dto);

    return this.userService.editUser(userId, dto);
  }
}
