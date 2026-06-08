// WHY THE OTEL IMPORT IS FIRST: OpenTelemetry instrumentation must be registered
// before NestJS (or any other module) loads. If you move this import below the
// NestJS bootstrap, auto-instrumentation won't capture the early lifecycle events.
// This is the #1 OTEL gotcha in NestJS applications.
import './common/telemetry/tracing'; // Must be first — see comment above

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Logger — must replace NestJS default before anything else logs
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  // Cookie parser — required for reading httpOnly refresh token cookies
  app.use(cookieParser());

  // Security
  app.use(helmet());

  // CORS — only the configured frontend origin
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Global validation pipe — transforms and validates all DTOs
  // WHY transform: true: class-transformer converts plain objects to DTO instances
  // so @Type() decorators work on nested objects
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: false,
    }),
  );

  // Global exception filter — converts HttpExceptions to standard error shape
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  // API versioning prefix.
  // `health` is excluded so the check stays at /health (LO-07 contract, and what
  // the docker-compose healthcheck and README reference) rather than /api/v1/health.
  app.setGlobalPrefix('api/v1', { exclude: ['health'] });

  // Swagger — auto-generated from decorators
  const config = new DocumentBuilder()
    .setTitle('PulseBoard API')
    .setDescription('Team health platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  logger.log(`PulseBoard API listening on port ${process.env.PORT ?? 3001}`, 'Bootstrap');
}

bootstrap();
