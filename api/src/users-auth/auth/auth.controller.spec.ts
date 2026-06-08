import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Pattern for testing controllers in this codebase:
// 1. Create a mock for every service dependency
// 2. Use TestingModule with the mock provider
// 3. Test the controller's interface, not the service logic

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockResponse = () => {
    const res: Partial<Response> = {
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    return res as Response;
  };

  const mockRequest = (cookies: Record<string, string> = {}) => {
    return { cookies } as unknown as Request;
  };

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      refreshTokens: jest.fn(),
      logout: jest.fn(),
      validateUser: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
      decode: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'NODE_ENV') return 'test';
        return undefined;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register and return access token', async () => {
      authService.register.mockResolvedValue({ accessToken: 'test-access-token' } as any);

      const result = await controller.register({
        email: 'alice@example.com',
        displayName: 'Alice',
        password: 'password123',
      });

      expect(authService.register).toHaveBeenCalledWith(
        'alice@example.com',
        'Alice',
        'password123',
      );
      expect(result).toEqual({ accessToken: 'test-access-token' });
    });
  });

  describe('login', () => {
    it('should set httpOnly cookie and return access token', async () => {
      authService.login.mockResolvedValue({
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        jti: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      } as any);
      const res = mockResponse();

      const result = await controller.login(
        { email: 'alice@example.com', password: 'password123' },
        res,
      );

      expect(authService.login).toHaveBeenCalledWith('alice@example.com', 'password123');
      expect(res.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'test-refresh-token',
        expect.objectContaining({ httpOnly: true, sameSite: 'strict' }),
      );
      expect(result).toEqual({ accessToken: 'test-access-token' });
    });
  });

  describe('refresh', () => {
    it('should read cookie, call refreshTokens, set new cookie, and return access token', async () => {
      authService.refreshTokens.mockResolvedValue({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        jti: 'b1ffcd00-1a2b-4c3d-8e9f-7a6b5c4d3e2f',
      } as any);
      const req = mockRequest({ refresh_token: 'old-refresh-token' });
      const res = mockResponse();

      const result = await controller.refresh(req, res);

      expect(authService.refreshTokens).toHaveBeenCalledWith('old-refresh-token');
      expect(res.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'new-refresh-token',
        expect.objectContaining({ httpOnly: true, sameSite: 'strict' }),
      );
      expect(result).toEqual({ accessToken: 'new-access-token' });
    });

    it('should throw 401 when refresh token cookie is missing', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await expect(controller.refresh(req, res)).rejects.toMatchObject({
        response: expect.objectContaining({ errorCode: 'AUTH_TOKEN_EXPIRED' }),
      });
    });
  });

  describe('logout', () => {
    it('should clear the refresh_token cookie', async () => {
      const req = mockRequest({ refresh_token: 'some-refresh-token' });
      const res = mockResponse();
      // JwtService.decode is called inside logout — we need to mock it via the module
      // The JwtService mock decode is already set up as jest.fn() returning undefined
      authService.logout.mockResolvedValue(undefined);

      await controller.logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith(
        'refresh_token',
        expect.objectContaining({ httpOnly: true, sameSite: 'strict' }),
      );
    });
  });
});
