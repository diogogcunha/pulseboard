# PulseBoard

## Project
Team health platform. Stack: NestJS API (`api/`), Next.js frontend (`web/`).
Default local dev uses SQLite + an in-memory key/value store (no Docker needed);
Postgres + Redis are opt-in (`DB_DRIVER=postgres`, set `REDIS_URL`) and used in Docker.
Each module owns its full vertical slice.

## Data Stores
Persistence is TypeORM — driver-agnostic, so write entity/repository code that works
on both SQLite and Postgres (avoid Postgres-only SQL in shared paths; raw aggregation
queries that use Postgres-only functions belong behind the Postgres path).
For single-use tokens / refresh-token state, inject `KeyValueStore` (from
`common/kv`) — never import Redis directly.

## Module Boundaries
Never import from another module's internal files. Only the barrel export (`index.ts`).
Modules: `users-auth`, `pulses`, `insights`, `notifications`.

## API Error Shape
All API errors: `{ statusCode: number, message: string, errorCode: string }`. No exceptions.

## Logging
Never log: passwords, JWT tokens, magic link tokens, raw request bodies.
Always include `traceId` in every log entry for a request.

## Tests
Test files alongside source: `*.spec.ts`. DB-dependent integration tests in `test/`.

## Configuration
Use `ConfigService`. Never `process.env` directly.

## Build Commands
- API dev (default, no Docker):  `cd api && npm install && npm run start:dev`
- Web dev:                       `cd web && npm install && npm run dev`
- Full infra (Postgres+Redis):   `docker-compose up`  (optional)
- Tests:                         `cd api && npm test`
- Lint:                          `cd api && npm run lint`
