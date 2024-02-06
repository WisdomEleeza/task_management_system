import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createTask(): Promise {}
}
