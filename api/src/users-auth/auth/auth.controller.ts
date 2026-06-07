import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// Cookie name is a constant so it's consistent across set/clear operations.
const REFRESH_TOKEN_COOKIE = 'refresh_token';
// 7 days in milliseconds for cookie maxAge.
const REFRESH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// WHY THE ROUTES ARE VERSIONED: BK-01 requires /api/v1/ prefix.
// The global prefix in main.ts adds /api/v1/ — so this controller is /api/v1/auth/*.
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // POST /api/v1/auth/register
  // Creates user, returns access token. Refresh token is not issued on register.
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { accessToken } = await this.authService.register(
      dto.email,
      dto.displayName,
      dto.password,
    );
    return { accessToken };
  }

  // POST /api/v1/auth/login
  // Validates credentials, sets refresh token as httpOnly cookie, returns access token.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      dto.email,
      dto.password,
    );
    // WHY httpOnly: prevents XSS from reading the refresh token via document.cookie.
    // WHY sameSite strict: prevents CSRF from another origin triggering a token refresh.
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: REFRESH_COOKIE_MAX_AGE_MS,
    });
    return { accessToken };
  }

  // POST /api/v1/auth/refresh
  // Reads refresh_token cookie, validates it, returns new access token + rotates refresh token.
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined;
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Refresh token missing',
        errorCode: 'AUTH_TOKEN_EXPIRED',
      });
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshTokens(refreshToken);
    // Issue the rotated refresh token as a new cookie.
    res.cookie(REFRESH_TOKEN_COOKIE, newRefreshToken, {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: REFRESH_COOKIE_MAX_AGE_MS,
    });
    return { accessToken };
  }

  // POST /api/v1/auth/logout
  // Extracts jti from the refresh token cookie, invalidates it in KV, clears the cookie.
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined;
    if (refreshToken) {
      try {
        // Decode without throwing on expiry — we just want the jti to invalidate.
        const payload = this.jwtService.decode(refreshToken) as { jti?: string } | null;
        if (payload?.jti) {
          await this.authService.logout(payload.jti);
        }
      } catch {
        // If decode fails, the token is already invalid — still clear the cookie.
      }
    }
    res.clearCookie(REFRESH_TOKEN_COOKIE, {
      httpOnly: true,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
    });
  }
}
