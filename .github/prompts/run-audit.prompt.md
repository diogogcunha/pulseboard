---
name: run-audit
description: Run the Week 4 instrumentation audit on a module
---

<!-- WHY THIS PROMPT EXISTS: The instrumentation audit is the Week 4 exercise.
     This is the Copilot parallel to .claude/commands/run-audit.md.
     Invoke with /run-audit [module-name] in Copilot chat. -->

For the specified module, answer five questions:
1. Architectural decisions: why does this module work the way it does? What is implicit?
2. Naming/pattern conventions: what would a new developer get wrong on their first PR?
3. Dependency quirks: what non-obvious behaviours exist in dependencies used here?
4. Test conventions: what patterns are required here but not in other modules?
5. Security rules: what constraints must hold before touching this area?

For each gap found, produce:
- Gap description (one sentence)
- Failure mode if unaddressed (one sentence)
- Primitive type (Instructions / Agent / Skill / Command)
- Priority: High / Medium / Low
