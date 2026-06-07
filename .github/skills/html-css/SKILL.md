---
name: html-css
description: >
  Use when writing React components, Next.js pages, Tailwind CSS classes,
  or HTML markup.
---

# HTML/CSS Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): Direct parallel to .claude/skills/html-css/SKILL.md. -->

## Component Structure
TypeScript (`.tsx`), named exports, server components by default, `'use client'` only when needed.

## Tailwind
Use design tokens from `tailwind.config.ts`. Class order: layout → spacing → sizing → typography → colors → state → responsive. Avoid `@apply` in components.

## Forms
Controlled inputs. Error messages as `<p role="alert">` after the input. Disabled submit during loading.

## Images
Always `next/image`. Always descriptive `alt` text. Always intrinsic dimensions.
