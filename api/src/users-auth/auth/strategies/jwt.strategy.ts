import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// WHY THE PAYLOAD SHAPE IS TYPED HERE: The JWT strategy is the single place
// where the token payload shape is decoded. If you change the token payload in
// AuthService, change it here too. The @CurrentUser() decorator downstream
// depends on { id, email } being present.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // TODO (Issue #1): return { id: payload.sub, email: payload.email }
    // This return value becomes req.user, accessible via @CurrentUser()
    return { id: payload.sub, email: payload.email };
  }
}
