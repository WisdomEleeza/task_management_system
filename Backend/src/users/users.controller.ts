import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guard';
import { UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('task')
  createTask(@Body() dto: UserDto) {
    return this.UserService.createTask(dto);
  }
}
