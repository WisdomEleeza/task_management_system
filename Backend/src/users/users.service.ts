import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createTask(dto: UserDto) {
    const task = this.prisma.task.create({
      data: { title: dto.title, description: dto.description },
    });
    return task;
  }
}
