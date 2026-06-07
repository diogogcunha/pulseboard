import { Injectable } from '@nestjs/common';
import { KeyValueStore } from './key-value.store';

// WHY THIS EXISTS: The default backend for KeyValueStore. Keys live in process
// memory with optional TTL expiry — no external service, so the app runs without
// Redis or Docker. Sufficient for single-node local dev and the workshop.
//
// NOT for production: state is per-process and lost on restart, so it does not work
// across multiple instances. Set REDIS_URL to switch to the Redis backend there.
@Injectable()
export class InMemoryKeyValueStore extends KeyValueStore {
  private readonly store = new Map<string, { value: string; expiresAt?: number }>();

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    });
  }

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== undefined && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }
}
