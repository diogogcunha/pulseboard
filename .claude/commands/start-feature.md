---
name: start-feature
description: Begin implementation of an assigned GitHub issue
---

<!-- WHY THIS COMMAND EXISTS: The start-feature flow has a specific order — read the
     issue, orient to the module, find the pattern, implement, verify. Skipping
     any step is a common source of convention violations. -->

1. `gh issue view $ARGUMENTS` — read title, description, acceptance criteria, labels
2. Identify the module from the `module:*` label 
3. `cd` into the module directory and read a module file so its CLAUDE.md loads
   (the trigger is reading a file in the subtree, not `cd` alone). Read the module's CLAUDE.md if it doesn't appear in context.
4. Load any skills that fit the module's need
5. Find an analogous existing feature as the implementation pattern to follow
6. Implement following module constraints
7. After each file edit: `npm run lint` (from api/ or web/ as appropriate)
8. Run `npm test` before final commit
