import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(username: string, password: string): Promise<any> {
    const salt = 10;
  }
}
