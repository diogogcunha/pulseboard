# PulseBoard — Workspace Instructions

<!-- WHY THIS FILE EXISTS: This is the GitHub Copilot equivalent of CLAUDE.md.
     It loads at every Copilot session start, before any file is opened.
     Keep it short — only truly global rules live here. Module-specific rules
     live in .github/instructions/*.instructions.md (scoped by applyTo glob). -->

## Project
PulseBoard is a team health and retrospective platform. Stack: NestJS API (`/api`), Next.js frontend (`/web`), PostgreSQL, Redis.

## Module Boundaries
Never import from another module's internal files. Only use a module's barrel export (`index.ts`). The four modules are: `users-auth`, `pulses`, `insights`, `notifications`.

## API Error Shape
All API errors return: `{ statusCode: number, message: string, errorCode: string }`. Never deviate from this shape.

## Logging
Never log: passwords, JWT tokens, magic link tokens, or raw request bodies. Always include `traceId` in log context.

## Tests
Test files live alongside source files, named `*.spec.ts`. Integration tests that require a DB connection go in `test/`.

## Configuration
Always use `ConfigService` to read environment variables. Never use `process.env` directly in application code.
