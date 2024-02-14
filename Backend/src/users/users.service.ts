import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createTask(email: string, dto: UserDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          user: { connect: { email: email } },
        },
      });
      return task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
