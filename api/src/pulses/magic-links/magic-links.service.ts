import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeyValueStore } from '../../common/kv/key-value.store';
import * as crypto from 'crypto';

// WHY HMAC INSTEAD OF JWT: Magic links are single-use tokens for unauthenticated
// access. HMAC-SHA256 is simpler (no library needed), compact, and the signature
// verification is a direct compute (not a key lookup). JWT would work too but adds
// unnecessary overhead for this use case.
@Injectable()
export class MagicLinksService {
  // `kv` is the single-use token store — in-memory by default (no Redis needed),
  // or Redis when REDIS_URL is set. Use kv.set/has/delete; never import Redis here.
  constructor(
    private readonly config: ConfigService,
    private readonly kv: KeyValueStore,
  ) {}

  // TODO (Issue #6): Implement — generate HMAC-signed token
  // Token payload: { userId, pulseId, expiresAt: Date.now() + 24h }
  // Token format: base64url(payload) + '.' + HMAC-SHA256(payload, MAGIC_LINK_SECRET)
  generateToken(userId: string, pulseId: string): string {
    throw new Error('Not implemented — see Issue #6');
  }

  // TODO (Issue #6): Implement — verify token signature and expiry
  // Returns the payload if valid; throws if expired, invalid, or already used
  verifyToken(token: string): { userId: string; pulseId: string } {
    throw new Error('Not implemented — see Issue #6');
  }

  // TODO (Issue #6): Implement — mark token as used via `this.kv` (single-use
  // enforcement). e.g. await this.kv.set(`magic:${token}`, '1', 24 * 60 * 60)
  async markUsed(token: string): Promise<void> {
    throw new Error('Not implemented — see Issue #6');
  }

  // TODO (Issue #6): Implement — check if token has already been used
  // e.g. return this.kv.has(`magic:${token}`)
  async isUsed(token: string): Promise<boolean> {
    throw new Error('Not implemented — see Issue #6');
  }
}
