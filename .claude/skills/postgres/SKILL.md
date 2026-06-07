---
name: postgres
description: >
  Use when writing migrations, TypeORM entities, repository queries, or making
  decisions about indexes, schema design, or database constraints.
---

# PostgreSQL Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: PostgreSQL + TypeORM has sharp edges around migrations,
     soft deletes, and raw vs ORM queries. These constraints prevent the most
     common mistakes. -->

## Entities
- Primary keys: UUID (`@PrimaryGeneratedColumn('uuid')`)
- Timestamps: `@CreateDateColumn()` and `@UpdateDateColumn()` on every entity
- Soft deletes: `@DeleteDateColumn()` where specified (User, Pulse)
- All columns explicitly typed — never rely on TypeORM inference

## Migrations
- Named: `NNN-descriptive-name.ts` (e.g. `001-create-users-table.ts`)
- Each migration has both `up()` and `down()` methods
- Never use `synchronize: true` — migrations only
- Foreign key constraints enforced at DB level (not just application)
- Run with: `cd api && npm run migration:run`

## Soft Deletes
TypeORM `@DeleteDateColumn()` + `@Entity({ withDeleted: false })` ensures soft-deleted
rows are excluded from standard queries. But `find()` and `findOne()` still return them
if `withDeleted: true` — use the typed repository methods (`findActiveById()`) that
wrap queries with `where deleted_at IS NULL`.

## Aggregation Queries
For aggregation (pulse results, trends), use QueryBuilder or raw SQL — never load all
rows into application memory and aggregate in JavaScript.
Raw queries live in `src/insights/queries/aggregation.queries.ts`.

## Indexes
Always index:
- Foreign keys (TypeORM does NOT add these automatically)
- Columns in WHERE clauses on large tables
- Columns in ORDER BY on paginated queries

## Connection
Pool size is configurable via `DB_POOL_SIZE` env var (default: 10).
Never create a new connection inside a request handler.
