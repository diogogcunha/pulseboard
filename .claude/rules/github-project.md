# GitHub Project Conventions

<!-- WHY THIS IS A RULE (not a skill): Project card management must happen every time
     work starts on an issue. Like git-branching.md, this is a global rule — it
     loads at session start so participants can't miss it even if they never mention
     "project" or "GitHub". -->

## Issue Lifecycle
1. **Pick** — assign an issue to yourself in GitHub Project
2. **Branch** — the issue-to-branch workflow creates the branch automatically
3. **Implement** — work on the feature branch; commit with conventional commits
4. **PR** — open a PR with the issue number in the title (e.g. `feat(users-auth): #1 register and login`)
5. **Review** — peer reviews; automated quality gate must pass
6. **Merge** — merging closes the issue and moves the project card to Done

## Issue Labels
- `module:*` — which vertical module this issue belongs to
- `skill:*` — which tech specialization is required
- `sprint:*` — which sprint this is scoped to
- `type:feature` or `type:infrastructure`

## Linking PRs to Issues
In the PR description, add: `Closes #[issue-number]`
This triggers the automated issue close on merge.

## Sprint Board
The GitHub Project has three table views: Sprint 1, Sprint 2, Sprint 3.
Filter by the `sprint:*` label. Move cards to "In Progress" when you start.
The automation moves them to "Done" on merge.
