# insights Module

## Aggregation Only
Never return individual responses. All endpoints return aggregated data only.
No user identifiers (raw or hashed) in any response from this module.

## DB-Side Aggregation
All aggregation in PostgreSQL. Never load rows into JS memory.
Complex queries in src/insights/queries/aggregation.queries.ts.

## Performance
< 200ms for 10,000 responses.
Use EXPLAIN ANALYZE when writing new aggregation queries.

## Module Boundary
Access pulse data via PulsesModule barrel export only.
Never import from api/src/pulses/entities/ directly.
