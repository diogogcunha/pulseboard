---
name: review-code
description: Review current changes against module conventions before committing
---

<!-- WHY THIS COMMAND EXISTS: A quick self-review catches convention violations before
     a peer sees them. Saves review cycles. This is listed as a Claude command (not
     a Copilot prompt) because it takes advantage of Claude's direct terminal access
     to run git diff — but the same workflow could exist as a Copilot prompt. -->

1. `git diff HEAD` — see all current changes
2. For each changed file, identify which module it belongs to
3. Read that module's CLAUDE.md constraints
4. Check each change against:
   - Module boundary rules (no cross-module imports except via barrel export `index.ts`)
   - API error shape: `{ statusCode, message, errorCode }` — no exceptions
   - Logging: no passwords, JWT tokens, magic link tokens, or raw request bodies in log calls
   - Test coverage: new service methods need at least one `*.spec.ts` entry
5. Report:
   - ✅ what passes
   - ⚠️ what needs attention (convention drift, missing tests)
   - ❌ what is blocked (security violation, missing error code)
