---
name: postgres
description: >
  Use when writing migrations, TypeORM entities, repository queries, or making
  decisions about indexes, schema design, or database constraints.
---

# PostgreSQL Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): Direct parallel to .claude/skills/postgres/SKILL.md.
     Persistence-specific conventions separate from the broader NestJS skill. -->

## Entities
- Primary keys: UUID (`@PrimaryGeneratedColumn('uuid')`)
- Timestamps: `@CreateDateColumn()` and `@UpdateDateColumn()` on every entity
- Soft deletes: `@DeleteDateColumn()` where specified (User, Pulse)

## Migrations
Named `NNN-descriptive-name.ts`. Always have `up()` and `down()`.
Never `synchronize: true`. Run with: `cd api && npm run migration:run`.

## Soft Deletes
`@DeleteDateColumn()` + default `withDeleted: false`. Use typed repository methods
(`findActiveById()`) — never raw `find()` which can return deleted rows.

## Aggregation
Use QueryBuilder or raw SQL for aggregation — never load all rows into JS memory.

## Indexes
Always add indexes on: foreign keys, columns in WHERE clauses, columns in ORDER BY.
TypeORM does NOT add foreign key indexes automatically.
