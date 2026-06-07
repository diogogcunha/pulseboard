# Git Branching Conventions

<!-- WHY THIS IS A RULE (not a skill): Branch naming must be correct before the first
     commit. A skill is description-triggered — if the developer never mentions "git"
     or "branch", it might not fire. A global rule loads at every session start.
     This is an example of the rules-vs-skills loading guarantee distinction. -->

## Branch Naming
All branches follow: `[type]/[module]/[issue-number]-[slugified-title]`

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Examples:
- `feat/users-auth/1-user-registration-and-login-api`
- `fix/pulses/6-magic-link-replay-attack`
- `chore/common/14-structured-logging`

The issue-to-branch automation (GitHub Actions) creates branches in this format.
If creating manually: `git checkout -b feat/[module]/[number]-[slug]`

## Commit Messages
Conventional Commits format: `type(scope): description`

Scope is the module name: `users-auth`, `pulses`, `insights`, `notifications`, `common`

Examples:
- `feat(users-auth): implement JWT refresh token rotation`
- `fix(pulses): prevent magic link replay attack`
- `test(insights): add aggregation query performance test`

## PR Titles
Same format as commit messages. The PR title becomes the merge commit.

## Never
- `git push --force` on shared branches
- Direct pushes to `main`
- Commits without a scope (e.g. `fix: typo` not allowed — must be `fix(scope): typo`)
