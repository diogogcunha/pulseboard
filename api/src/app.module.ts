import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { configSchema } from './common/config/config.schema';
import { CommonModule } from './common/common.module';
import { UsersAuthModule } from './users-auth/users-auth.module';
import { PulsesModule } from './pulses/pulses.module';
import { InsightsModule } from './insights/insights.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    // Config — validate all env vars at startup via Joi schema
    // WHY validationSchema here: if a required env var is missing, the app
    // fails at startup with a clear error, not silently at runtime.
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
    }),

    // Database — configured from env vars, no synchronize in production
    // Database — driver is selectable via DB_DRIVER (default: sqlite).
    // WHY two drivers: SQLite is the zero-install default so the repo runs with just
    // `npm install && npm run start:dev` — no Docker, no Postgres, cross-platform.
    // Postgres remains available for full production fidelity (DB_DRIVER=postgres).
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const logging: ('query' | 'error')[] =
          config.get('NODE_ENV') === 'development' ? ['query'] : ['error'];
        const entities = [__dirname + '/**/*.entity{.ts,.js}'];

        if (config.get('DB_DRIVER') === 'postgres') {
          return {
            type: 'postgres' as const,
            host: config.get('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASS'),
            database: config.get('DB_NAME'),
            entities,
            migrations: [__dirname + '/../migrations/**{.ts,.js}'],
            synchronize: false, // NEVER true in production — use migrations
            poolSize: config.get<number>('DB_POOL_SIZE'),
            logging,
          };
        }

        // Default: SQLite. synchronize:true auto-builds the schema from the entities,
        // so no migrations are needed for local dev. (The Postgres path uses the
        // versioned migrations instead, per DB-01.)
        return {
          type: 'better-sqlite3' as const,
          database: config.get<string>('DB_DATABASE') || './pulseboard.dev.sqlite',
          entities,
          synchronize: true,
          logging,
        };
      },
      inject: [ConfigService],
    }),

    // Rate limiting — 100 req/min globally; auth routes override to 10 req/min
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    // Event bus — used for cross-module events (pulse.submitted, etc.)
    // WHY EventEmitter2: NestJS's built-in EventEmitter2 integration provides
    // @OnEvent() decorator support with typed events. It's in-process (not a queue),
    // which is sufficient for v1.0.
    EventEmitterModule.forRoot(),

    // Scheduled tasks (account deletion GDPR job, etc.)
    ScheduleModule.forRoot(),

    // Feature modules
    CommonModule,
    UsersAuthModule,
    PulsesModule,
    InsightsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
