---
name: run-audit
description: Run the Week 4 instrumentation audit on a module
---

<!-- WHY THIS COMMAND EXISTS: The instrumentation audit is the Week 4 primary exercise.
     It surfaces tacit knowledge that should be explicit in primitives. Five questions
     force a systematic look at what an agent could get wrong. -->

For module $ARGUMENTS:
1. Read the module's CLAUDE.md and source files. What decisions are implicit (not in any primitive)?
2. Read 3-5 representative files. What would a new developer violate on their first PR?
3. Read imports. What non-obvious library behaviours exist in the dependencies used here?
4. Read *.spec.ts files. What test patterns are specific to this module?
5. What security constraints apply before any change to this module?

For each gap found, produce:
- **Description**: one sentence
- **Failure mode if unaddressed**: one sentence
- **Primitive type**: CLAUDE.md rule / .claude/rules entry / .claude/agents entry / .claude/commands
- **Priority**: High (agent would get wrong on the very next task) / Medium / Low
