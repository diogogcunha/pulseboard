---
name: nestjs
description: >
  Use when implementing NestJS controllers, services, modules, guards,
  interceptors, pipes, decorators, DI patterns, ConfigService, or lifecycle hooks.
---

# NestJS Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): This is the direct parallel to .claude/skills/nestjs/SKILL.md.
     The same trigger model: description-matched, loaded on demand. The pedagogical point
     is that the same SKILL.md content ports across harnesses with only frontmatter tweaks. -->

## Module Structure
Each feature module follows: `module.ts` → `controller.ts` → `service.ts` → `repository.ts`.
Never put business logic in controllers; never put DB queries in services.

## Dependency Injection
Always inject via constructor. Never use property injection or `ModuleRef.get()` directly
unless implementing dynamic providers (document why if you do).

## Configuration
Use `ConfigService` from `@nestjs/config` everywhere. Never `process.env` directly.
The config schema is validated at startup in `src/common/config/config.schema.ts`.

## Guards and Decorators
- `JwtAuthGuard` applied at controller level with `@UseGuards(JwtAuthGuard)`
- `@CurrentUser()` custom decorator — use instead of `req.user`
- `@Public()` marks routes that bypass JWT guard

## Error Handling
Throw `HttpException` subclasses. The `GlobalExceptionFilter` formats them to:
`{ statusCode, message, errorCode }`. Never return a raw error object from a controller.

## DTOs and Validation
All POST/PATCH bodies must be typed DTOs with class-validator decorators.
`ValidationPipe` is registered globally in `main.ts` with `transform: true`.

## Testing
Each service gets a `*.spec.ts` alongside it. Use `@nestjs/testing` `TestingModule`.
Mock repositories with `{ provide: getRepositoryToken(Entity), useValue: mockRepo }`.
