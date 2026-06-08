import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { KeyValueStore } from './key-value.store';

// WHY THIS EXISTS: The opt-in production backend for KeyValueStore. It is only
// instantiated when REDIS_URL is set (see CommonModule's factory), so no Redis
// connection is ever opened during the default no-Docker local workflow.
// Same interface as the in-memory store — feature code does not change when you
// switch backends.
@Injectable()
export class RedisKeyValueStore extends KeyValueStore implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(config: ConfigService) {
    super();
    this.client = new Redis(config.get<string>('REDIS_URL') as string);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async has(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  onModuleDestroy(): void {
    this.client.disconnect();
  }
}
