import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common';

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
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(password);

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
    it('should handle PrismaClientKnownRequestError', async () => {
      // Arrange
      const mockAuthDto: AuthDto = {
        username: 'test-username',
        email: 'test@example.com',
        password: 'password123',
      };

      // Mock the PrismaService create method to throw a known error
      jest
        .spyOn(prismaServiceMock.user, 'create')
        .mockRejectedValueOnce(new ForbiddenException('Credentials Taken'));
    });
    
  });
});
