import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EdiTUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EdiTUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    console.log('User updated:', user);
    const { hash, ...userWithOutPassword } = user;

    return userWithOutPassword;
  }
}
