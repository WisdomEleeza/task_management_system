import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthServices: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthServices.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.AuthServices.signin(dto);
  }
}
