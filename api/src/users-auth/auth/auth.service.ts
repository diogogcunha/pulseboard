import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service';
import { KeyValueStore } from '../../common/kv/key-value.store';
import { User } from '../users/entities/user.entity';

// Refresh tokens live 7 days; the KV TTL matches so Redis/in-memory auto-expires them.
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
// KV key prefix to namespace refresh tokens and avoid collisions.
const RT_KEY_PREFIX = 'rt:';

@Injectable()
export class AuthService {
  // `kv` stores valid/invalidated refresh tokens — in-memory by default (no Redis
  // needed), or Redis when REDIS_URL is set. Use kv.set/get/delete; never import Redis.
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly kv: KeyValueStore,
  ) {}

  // Called by LocalStrategy. Thin delegation — keeps strategy decoupled from UsersService.
  async validateUser(email: string, password: string): Promise<User | null> {
    return this.usersService.validateCredentials(email, password);
  }

  // Register new user, return access token (no refresh token on register by design).
  async register(email: string, displayName: string, password: string) {
    const user = await this.usersService.create(email, displayName, password);
    const accessToken = this.signAccessToken(user.id, user.email);
    return { accessToken };
  }

  // Validate credentials, return access + refresh tokens.
  // Refresh token is a JWT whose jti is stored in KV so it can be invalidated.
  async login(email: string, password: string) {
    const user = await this.usersService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid email or password',
        errorCode: 'AUTH_INVALID_CREDENTIALS',
      });
    }
    return this.issueTokens(user);
  }

  // Validate refresh token, issue new access token (token rotation).
  async refreshTokens(refreshToken: string) {
    let payload: { sub: string; email: string; jti: string };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Refresh token expired or invalid',
        errorCode: 'AUTH_TOKEN_EXPIRED',
      });
    }

    const kvKey = `${RT_KEY_PREFIX}${payload.jti}`;
    const stored = await this.kv.get(kvKey);
    if (!stored) {
      // Token was already invalidated (logout) or never stored.
      throw new UnauthorizedException({
        message: 'Refresh token expired or invalid',
        errorCode: 'AUTH_TOKEN_EXPIRED',
      });
    }

    // Rotate: invalidate old token, issue new pair.
    await this.kv.delete(kvKey);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
        errorCode: 'AUTH_INVALID_CREDENTIALS',
      });
    }
    return this.issueTokens(user);
  }

  // Invalidate all refresh tokens for a user by deleting the KV entry for their jti.
  // Because the refresh token cookie is the only copy of the jti, we accept it from the caller.
  async logout(jti: string) {
    if (jti) {
      await this.kv.delete(`${RT_KEY_PREFIX}${jti}`);
    }
  }

  // --- private helpers ---

  private signAccessToken(userId: string, email: string): string {
    return this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') ?? '15m',
      },
    );
  }

  private signRefreshToken(userId: string, email: string, jti: string): string {
    return this.jwtService.sign(
      { sub: userId, email, jti },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  private async issueTokens(user: User) {
    const jti = randomUUID();
    const accessToken = this.signAccessToken(user.id, user.email);
    const refreshToken = this.signRefreshToken(user.id, user.email, jti);
    // Store jti in KV so we can invalidate it on logout/rotation.
    await this.kv.set(`${RT_KEY_PREFIX}${jti}`, user.id, REFRESH_TOKEN_TTL_SECONDS);
    return { accessToken, refreshToken, jti };
  }
}
