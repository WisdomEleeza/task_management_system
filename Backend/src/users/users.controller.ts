import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard';
import { UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('task')
  createTask(@Request() req, @Body() dto: UserDto) {
    const user = req.user.id;
    return this.UserService.createTask(user, dto);
  }
}
