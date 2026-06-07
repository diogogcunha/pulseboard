---
name: start-feature
description: Begin implementation of an assigned GitHub issue
---

<!-- WHY THIS PROMPT EXISTS: The start-feature flow has a specific order — read the
     issue, orient to the module, find the pattern, implement, verify. This prompt
     is the Copilot parallel to .claude/commands/start-feature.md.
     Invoke with /start-feature [issue-number] in Copilot chat. -->

1. `gh issue view $ARGUMENTS` — read full description and acceptance criteria
2. Identify the module from the issue labels (`module:users-auth`, `module:pulses`, etc.)
3. Open the relevant module files in VS Code to activate the module's applyTo instructions
4. Identify the existing patterns in this module the new feature should follow
5. Implement following the module's `.instructions.md` constraints
6. Run `npm run lint` and `npm test` before committing
