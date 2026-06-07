---
name: accessibility
description: >
  Use when implementing accessible components, reviewing WCAG compliance,
  adding ARIA attributes, or ensuring keyboard navigation.
---

# Accessibility Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): Direct parallel to .claude/skills/accessibility/SKILL.md. -->

## Required on Every Interactive Component
- Visible focus indicator (`focus-visible:ring-2 focus-visible:ring-offset-2`)
- Keyboard operability (Enter/Space for buttons; arrow keys for groups)
- Accessible name (text content, `aria-label`, or `aria-labelledby`)

## Forms
- Every input has an associated `<label>` — not placeholder text
- Errors are `role="alert"` linked via `aria-describedby`
- Required fields: visual indicator AND `aria-required="true"`

## Color Contrast
Normal text: 4.5:1. Large text: 3:1. Never convey information by color alone.

## Charts
Every chart must have `aria-label` with text summary or adjacent `<figcaption>`.

## Page Structure
Skip-to-main link first. `<main>` landmark. `lang="en"` on `<html>`. One `<h1>` per page.
