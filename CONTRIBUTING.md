# Contributing to PulseBoard

## Branch Naming

All branches follow this pattern: `[type]/[module]/[issue-number]-[slugified-title]`

**Branches are created automatically** when you assign a GitHub Issue to yourself.
The issue-to-branch workflow creates: `feat/[module-label]/[number]-[slug]` from `main`.

If you need to create a branch manually:
```bash
git checkout -b feat/users-auth/1-user-registration-and-login-api
```

**Types**: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

**Modules**: `users-auth`, `pulses`, `insights`, `notifications`, `common`

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): short description

Optional longer description explaining WHY the change was made.
```

**Examples**:
```
feat(users-auth): implement JWT refresh token rotation
fix(pulses): prevent magic link replay by checking Redis on validation
test(insights): add aggregation query performance test
chore(common): add SensitiveFieldsFilter for PII in logs
```

**Rules**:
- Scope is required — must be the module name
- Description in lowercase, imperative mood ("add" not "added")
- No period at the end

---

## Pull Requests

1. PR title follows commit message format
2. Description includes `Closes #[issue-number]`
3. The quality gate (lint + type-check + tests + coverage) must pass
4. At least one review required before merge

### PR Checklist

```markdown
- [ ] `npm run lint` passes
- [ ] `npm test` passes (from api/ or web/)
- [ ] New service methods have spec tests
- [ ] No passwords, tokens, or PII in log statements
- [ ] API errors use { statusCode, message, errorCode }
- [ ] Module boundary respected (only barrel exports imported from other modules)
- [ ] ConfigService used (no process.env in application code)
```

---

## Module Boundaries

**Rule**: never import from another module's internal files. Only use a module's barrel export (`index.ts`).

```typescript
// ✅ Good — imports from barrel export
import { UsersService } from '../users-auth';

// ❌ Bad — reaches into another module's internals
import { UsersService } from '../users-auth/users/users.service';
```

The four modules: `users-auth`, `pulses`, `insights`, `notifications`.

Cross-module communication for async events: use EventEmitter2 (`@OnEvent()`) rather than direct service imports.
