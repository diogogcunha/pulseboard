---
name: nestjs
description: >
  Use when implementing NestJS controllers, services, modules, guards,
  interceptors, pipes, decorators, DI patterns, ConfigService, or lifecycle hooks.
---

# NestJS Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: NestJS has many valid patterns. This skill constrains
     which patterns PulseBoard uses, so the agent doesn't invent new ones. -->

## Module Structure
Each feature module follows: `module.ts` → `controller.ts` → `service.ts` → `repository.ts`.
Never put business logic in controllers; never put DB queries in services.

## Dependency Injection
Always inject via constructor. Never use property injection or `ModuleRef.get()` directly
unless implementing dynamic providers (document why if you do).

## Configuration
Use `ConfigService` from `@nestjs/config` everywhere. Never `process.env` directly.
The config schema is validated at startup in `src/common/config/config.schema.ts` — add new
env vars there, not just to `.env.example`.

## Guards and Decorators
- `JwtAuthGuard` — applied at controller level with `@UseGuards(JwtAuthGuard)`
- `@CurrentUser()` — custom decorator that extracts user from request; use instead of `req.user`
- `@Public()` — marks routes that bypass JWT guard (magic link endpoints, health check)

## Error Handling
Throw `HttpException` subclasses (e.g. `UnauthorizedException`, `NotFoundException`).
The global exception filter (`GlobalExceptionFilter`) converts them to the standard error shape:
`{ statusCode, message, errorCode }`. Never return a raw error object from a controller.

## DTOs and Validation
All POST/PATCH request bodies must be typed DTOs with class-validator decorators.
Use `@Type()` from class-transformer for nested objects.
The `ValidationPipe` is registered globally in `main.ts` with `transform: true`.

## Response Shape
Controllers return plain objects or DTOs. Never return TypeORM entities directly —
they may expose soft-deleted records or internal fields.

## Testing
Each service gets a `*.spec.ts` alongside it. Use `@nestjs/testing` `TestingModule`.
Mock repositories with `{ provide: getRepositoryToken(Entity), useValue: mockRepo }`.
