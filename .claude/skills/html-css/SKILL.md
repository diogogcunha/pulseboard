---
name: html-css
description: >
  Use when writing React components, Next.js pages, Tailwind CSS classes,
  or HTML markup for PulseBoard.
---

# HTML/CSS Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: Tailwind + Next.js App Router has specific patterns.
     This skill prevents inconsistent component structure and class ordering. -->

## Component Structure
- All components are TypeScript (`.tsx`), no `.jsx`
- Server components by default in Next.js App Router; add `'use client'` only when needed
- Props interface defined above the component function
- Named exports (not default exports) for components used across pages

## Tailwind
- Use the design tokens in `tailwind.config.ts` — never hardcode colors outside the config
- Class order: layout → spacing → sizing → typography → colors → state → responsive
- Responsive prefix order: mobile-first (base → `sm:` → `md:` → `lg:`)
- Avoid `@apply` in components; use it only in `globals.css` for truly global styles

## Forms
- Controlled inputs with explicit `value` and `onChange`
- Error messages rendered as `<p role="alert">` immediately after the input
- Submit button disabled during loading (`disabled={isLoading}`)
- Use `aria-describedby` to link inputs to their error messages

## Images
- Always `next/image` for raster images, never `<img>`
- Always descriptive `alt` text — not filenames or empty
- Intrinsic dimensions specified (prevents CLS)
