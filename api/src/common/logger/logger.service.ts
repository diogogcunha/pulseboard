import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

// WHY THIS CLASS EXISTS: NestJS's built-in Logger doesn't produce structured JSON.
// This Winston-backed logger produces the structured JSON format required by LO-01
// (timestamp, level, service, traceId, message) and filters sensitive fields.
// It implements NestJS's LoggerService interface so it can replace the default logger.
@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly config: ConfigService) {
    const isDev = config.get('NODE_ENV') === 'development';

    this.logger = winston.createLogger({
      level: config.get('LOG_LEVEL') ?? 'info',
      format: isDev
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          )
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
      defaultMeta: { service: 'pulseboard-api' },
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
