---
name: accessibility
description: >
  Use when implementing accessible components, reviewing WCAG compliance,
  adding ARIA attributes, or ensuring keyboard navigation works correctly.
---

# Accessibility Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: PulseBoard's pulse response page is used on mobile
     by team members, often quickly and sometimes with assistive technology.
     These are non-negotiable baselines. -->

## Required on Every Interactive Component
- Visible focus indicator (Tailwind `focus-visible:ring-2 focus-visible:ring-offset-2`)
- Keyboard operability (Enter/Space activates buttons; arrow keys navigate groups)
- Accessible name (either text content, `aria-label`, or `aria-labelledby`)

## Forms (WCAG 2.1 SC 1.3.1, 3.3.1)
- Every input has an associated `<label>` — not placeholder text
- Error messages are `role="alert"` and linked via `aria-describedby`
- Required fields marked with both visual indicator AND `aria-required="true"`

## Color Contrast
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (18pt / 14pt bold): 3:1 minimum
- UI components and state indicators: 3:1 minimum
- Never convey information by color alone

## Charts (WCAG 2.1 SC 1.1.1)
- Every chart must have a text alternative: either `aria-label` with a summary or
  an adjacent `<figcaption>` or description paragraph
- Interactive chart elements need keyboard focus and role="img" or appropriate role

## Page Structure
- Skip-to-main link as the first focusable element
- `<main>` landmark on every page
- `lang="en"` on `<html>` (set in root layout)
- Logical heading hierarchy (one `<h1>` per page, no skipped levels)

## The Pulse Response Page (Priority)
This page is the highest-accessibility-risk surface:
- No login required, so no assumption about user capabilities
- Mobile-first layout
- All three response types (scale, emoji, text) must be screen-reader navigable
- Success/error state changes announced via `role="status"` or `role="alert"`
