import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { HealthController } from './health/health.controller';
import { KeyValueStore } from './kv/key-value.store';
import { InMemoryKeyValueStore } from './kv/in-memory-key-value.store';
import { RedisKeyValueStore } from './kv/redis-key-value.store';

// WHY @Global(): The LoggerService and KeyValueStore are used everywhere. Making
// this module global means feature modules don't need to import CommonModule just
// to get them.
//
// KeyValueStore backend is chosen at startup: in-memory by default (no Redis/Docker
// needed), or Redis when REDIS_URL is set. Feature code injects the KeyValueStore
// token and never knows which backend it got.
@Global()
@Module({
  providers: [
    LoggerService,
    {
      provide: KeyValueStore,
      useFactory: (config: ConfigService): KeyValueStore => {
        const redisUrl = config.get<string>('REDIS_URL');
        return redisUrl
          ? new RedisKeyValueStore(config)
          : new InMemoryKeyValueStore();
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerService, KeyValueStore],
  controllers: [HealthController],
})
export class CommonModule {}
