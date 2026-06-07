---
applyTo: "api/src/insights/**"
---

# insights Module Conventions

<!-- WHY THIS FILE EXISTS: Insights has two hard constraints — no raw responses
     ever returned, and aggregation must happen in the DB. Without this file,
     an agent might return individual responses or do application-level aggregation. -->

## Aggregation Only
The insights module NEVER returns individual pulse responses.
All endpoints return only aggregated data: mean, median, distribution, participation %.
The query results contain NO user identifiers (not even hashed).

## DB-Side Aggregation
All aggregation happens in PostgreSQL — never in application memory.
Complex queries live in `src/insights/queries/aggregation.queries.ts` as QueryBuilder or raw SQL.
Never use `.find()` + JavaScript `.reduce()` for aggregation.

## Performance Target
Aggregation queries must complete in under 200ms for 10,000 responses.
Use EXPLAIN ANALYZE when writing new aggregation queries.
Add indexes if the query plan shows a sequential scan on a large table.

## Module Boundaries
The insights module accesses pulse data via the pulses module's barrel export only.
Never import from `api/src/pulses/entities/` directly — use `PulsesModule` exports.
