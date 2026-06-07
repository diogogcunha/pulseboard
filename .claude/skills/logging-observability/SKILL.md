---
name: logging-observability
description: >
  Use when implementing logging, adding Winston configuration, setting up
  OpenTelemetry, writing health checks, or adding distributed tracing.
---

# Logging and Observability Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: Production incidents are debugged through logs and traces.
     These conventions ensure every request has a traceable path through the system. -->

## Winston Setup
Logger is a NestJS module in `src/common/logger/`.
Use `LoggerService` — never `console.log` anywhere in application code.
Log structure (all fields required):
```json
{
  "timestamp": "ISO8601",
  "level": "info|warn|error|debug",
  "service": "pulseboard-api",
  "traceId": "uuid-per-request",
  "message": "human-readable string",
  "...context": "additional fields"
}
```

## What to NEVER Log
- Passwords (any field named `password`, `passwd`, `secret`)
- JWT tokens (access or refresh)
- Magic link tokens
- Raw request bodies on auth endpoints
- Any field named `token`, `authorization`, `cookie`
The `SensitiveFieldsFilter` in `src/common/logger/sensitive-fields.filter.ts` strips these automatically.

## Request Logging
Every HTTP request is logged at `INFO` with: method, path, statusCode, responseTimeMs, traceId.
The `LoggerMiddleware` in `src/common/logger/logger.middleware.ts` handles this.

## TraceId Propagation
Generated per-request in `LogContextInterceptor`.
Stored in `AsyncLocalStorage` so it's accessible anywhere in the request context.
The OTEL trace ID is used when OTEL is active; a UUID fallback when it's not.

## Error Logging
Unhandled exceptions go through `GlobalExceptionFilter`.
It logs at `ERROR` with: message, stack, statusCode, traceId, path, method.
Never catch-and-swallow — always log before rethrowing or returning.

## OpenTelemetry
`@opentelemetry/sdk-node` with auto-instrumentation for HTTP and DB.
Traces exported to Jaeger at `http://localhost:4318` (OTLP).
Initialize in `src/main.ts` BEFORE NestJS bootstraps (instrumentation must load first).

## Health Check
`GET /health` returns `{ status: "ok", db: "connected" }` or `503` if DB is unreachable.
Uses `@nestjs/terminus` (HealthController in `src/common/health/`).
