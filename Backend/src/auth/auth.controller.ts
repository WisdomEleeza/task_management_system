import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// http://localhost:5556/auth/signup

@Controller('auth')
export class AuthController {
  constructor(private AuthServices: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthServices.signup(dto);
  }
}
