# PulseBoard — Instrumented Codebase Exercise

> **Week 4 exercise repo** for the AI-First Development Program.
> This repo is pre-wired for both GitHub Copilot (VS Code) and Claude Code (CLI).

---

## Quick Start (no Docker required)

The default setup needs only **Node.js 20+** — no Docker, no Postgres, no Redis.
The database is SQLite (a local file, created automatically) and the token store is in-memory.

```bash
# 1. Clone this repo
git clone <repo-url>
cd pulseboard

# 2. Copy environment files (defaults are ready to go — no editing needed)
cp api/.env.example api/.env
cp web/.env.example web/.env

# 3. Start the API (terminal 1)
cd api && npm install && npm run start:dev

# 4. Start the web app (terminal 2)
cd web && npm install && npm run dev

# 5. Open the app
#   App:      http://localhost:3000
#   API docs: http://localhost:3001/api/docs
#   Health:   http://localhost:3001/health
```

> **First run** installs dependencies and creates the SQLite schema automatically.
> Restarts are fast. The DB file (`api/pulseboard.dev.sqlite`) is git-ignored — delete
> it any time to reset to a clean database.

### Optional: full-infra mode with Docker

Prefer real Postgres + Redis + Jaeger tracing? Everything is still wired for it:

```bash
docker-compose up
```

This runs the same app against Postgres and Redis. To point a non-Docker run at
Postgres/Redis instead of the defaults, set `DB_DRIVER=postgres` (and the `DB_*` vars)
and `REDIS_URL` in `api/.env`.

---

## Your Mission

1. Go to the **GitHub Project** for this repo
2. Pick an issue from **Sprint 1** and assign it to yourself
3. Wait ~30 seconds — your feature branch is created automatically
4. Switch to the branch: `git fetch && git checkout feat/[module]/[number]-[slug]`
5. Open VS Code (or start Claude Code with `claude`) and start building

---

## The Primitives

This repo is pre-wired with AI agent primitives for two harnesses:

### GitHub Copilot (VS Code)

| Primitive | Location | Purpose |
|---|---|---|
| Workspace instructions | `.github/copilot-instructions.md` | Global rules, always loaded |
| Module instructions | `.github/instructions/*.instructions.md` | Module constraints, `applyTo` glob scoped |
| Module agents | `.github/agents/*.agent.md` | Domain specialists, user-selected |
| Skills | `.github/skills/*/SKILL.md` | Tech specializations, description-triggered |
| Prompts | `.github/prompts/*.prompt.md` | Reusable workflows, invoked with `/` |

**To use**: Select a module agent from the Copilot agent picker. Open a file in the module you're working on to activate the module instructions. Run `/start-feature [issue-number]` to begin.

### Claude Code (CLI)

| Primitive | Location | Purpose |
|---|---|---|
| Workspace instructions | `CLAUDE.md` | Global rules, always loaded |
| Module instructions | `api/src/[module]/CLAUDE.md` | Module constraints, triggered by reading module files |
| Module agents | `.claude/agents/*.md` | Domain specialists, on-demand |
| Skills | `.claude/skills/*/SKILL.md` | Tech specializations, description-triggered |
| Rules | `.claude/rules/*.md` | Always-on conventions (no model judgment needed) |
| Commands | `.claude/commands/*.md` | Reusable workflows, invoked with `/command-name` |

**To use**: Start Claude Code with `claude` in the repo root. Use `/start-feature [issue-number]` to begin. Use `@[agent-name]` to invoke a module specialist.

---

## What's Pre-Built vs What You Build

### Pre-Built (skeleton)
- ✅ Complete infrastructure (Docker, CI, agent primitives)
- ✅ Module structure with all files present (mostly stubbed)
- ✅ Entity definitions and database migrations (schema is complete)
- ✅ Common utilities (logger, config validation, exception filter, health check)
- ✅ Landing page HTML/CSS structure

### You Build (the 20 GitHub Issues)
- 🔨 Authentication and JWT logic (Issues #1–4)
- 🔨 Pulse creation and magic link flow (Issues #5–7)
- 🔨 Results aggregation and dashboards (Issues #8–9)
- 🔨 Email notifications and preferences (Issues #10–12)
- 🔨 SEO/AEO optimized landing page (Issue #13)
- 🔨 Observability and CI/CD (Issues #14–19)
- 🔨 GDPR account deletion (Issue #20)

---

## Week 4 Exercise Goal

By the end of this session:
1. Implement at least one Sprint 1 issue using the agent primitives
2. Run `/run-audit [module-name]` on the module you worked in
3. Identify 3–5 instrumentation gaps (what's still tacit / not in any primitive?)
4. For each gap, decide: what primitive type would fix it?

A well-instrumented module has 0–1 gaps. This skeleton has 5–10 per module — that's intentional.

---

## Branch and Commit Conventions

See `CONTRIBUTING.md` for the full guide. Summary:

- Branches: `feat/[module]/[issue-number]-[slug]` (created automatically on issue assign)
- Commits: `type(scope): description` — e.g. `feat(users-auth): implement JWT refresh rotation`
- PRs: `Closes #[issue-number]` in the description to auto-close on merge
# pulseboard
