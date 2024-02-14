import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';

describe('AuthService', () => {
  let authService: AuthService;
  let PrismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    PrismaServiceMock = module.get(PrismaService) as jest.Mocked<PrismaService>;
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Sign Up', () => {
    it('should signup a user', async () => {
      // Arrange
      const mockAuthDto: AuthDto = {
        username: 'test-username',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        username: 'test-username',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      //
    });
  });
});
