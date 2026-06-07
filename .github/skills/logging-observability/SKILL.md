---
name: logging-observability
description: >
  Use when implementing logging, adding Winston configuration, setting up
  OpenTelemetry, writing health checks, or adding distributed tracing.
---

# Logging and Observability Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): Direct parallel to .claude/skills/logging-observability/SKILL.md. -->

## Winston
Use `LoggerService` — never `console.log`.
Required log fields: `timestamp`, `level`, `service`, `traceId`, `message`.

## Never Log
Passwords, JWT tokens, magic link tokens, raw auth request bodies.
The `SensitiveFieldsFilter` strips these automatically — let it work.

## TraceId
Generated per-request in `LogContextInterceptor` via AsyncLocalStorage.
Include in every log entry for that request.

## OpenTelemetry
Initialize BEFORE NestJS bootstraps in `main.ts`.
Export to Jaeger at `http://localhost:4318` (included in docker-compose).

## Health Check
`GET /health` returns `{ status: "ok", db: "connected" }` or 503.
