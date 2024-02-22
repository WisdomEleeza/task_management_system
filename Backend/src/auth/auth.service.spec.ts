import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaServiceMock = module.get(PrismaService) as jest.Mocked<PrismaService>;
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

      // Mock the PrismaService create method
      jest
        .spyOn(prismaServiceMock.user, 'create')
        .mockResolvedValueOnce(mockUser);

      // Mock bcrypt.hash method
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValueOnce('hashedPassword');

      // Act
      const result = await authService.signup(mockAuthDto);

      // Assertion
      expect(result).toEqual({ access_token: expect.any(String) });

      // Verify that PrismaService create method was called with the correct argument
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          username: 'test-username',
          email: 'test@example.com',
          password: 'hashedPassword',
        },
      });
    });
  });
  describe('Sign In', () => {
    it('should sign in user', async () => {
      const mockAuthDto: AuthDto = {
        username: 'test-username',
        email: 'test@gmail.com',
        password: 'test123',
      };
      const mockUser = {
        id: 1,
        username: 'test-username',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      // Mock the PrismaService findUnique method
      jest
        .spyOn(prismaServiceMock.user, 'findUnique')
        .mockResolvedValueOnce(mockUser);

      // Mock bcrypt.compare method
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValueOnce(true);

      // Act
      const result = await authService.signin(mockAuthDto);

      // Assertion
      expect(result).toEqual({ access_token: expect.any(String) });

      // Verify that PrismaService findUnique method was called with the correct arguments
      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@gmail.com' },
      });

      // Verify that bcrypt.compare method was called with the correct argument
      expect(bcrypt.compare).toHaveBeenCalledWith('test123', 'hashedPassword');
    });
  });
});
