---
applyTo: "api/src/common/**"
---

# common Module Conventions

<!-- WHY THIS FILE EXISTS: The common module provides infrastructure shared across
     all four domain modules. The constraints here protect patterns that, if broken,
     break every module simultaneously. -->

## Logger Usage
Use `LoggerService` from `src/common/logger/logger.service.ts`.
Never use `console.log`, `console.error`, or NestJS built-in Logger in application code.
The `LoggerService` adds traceId automatically via `AsyncLocalStorage`.

## Sensitive Fields Filter
`SensitiveFieldsFilter` in `src/common/logger/sensitive-fields.filter.ts` strips PII.
If you log an object, it passes through this filter.
Do NOT spread credentials into log context manually — you might accidentally bypass the filter.
Always pass the raw DTO/object and let the filter strip it.

## Exception Filter
`GlobalExceptionFilter` standardizes all error responses.
Do NOT add try/catch in controllers that return custom error shapes.
Throw the right `HttpException` subclass and let the filter handle formatting.

## Config Schema
All new environment variables MUST be added to `src/common/config/config.schema.ts`.
The Joi schema validates at startup — an undeclared env var causes a startup failure with a clear message.
This is intentional: it prevents silent runtime failures from missing config.

## CurrentUser Decorator
Use `@CurrentUser()` to extract the authenticated user from request context.
Never access `request.user` directly in controllers.
