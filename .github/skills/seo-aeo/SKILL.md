---
name: seo-aeo
description: >
  Use when working on the landing page, public-facing pages, metadata, structured
  data (JSON-LD), robots.txt, or sitemap.xml.
---

# SEO and AEO Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS (Copilot): Direct parallel to .claude/skills/seo-aeo/SKILL.md. -->

## Required on Every Public Page
- Unique `<title>` and `<meta description>`
- `canonical` URL
- Open Graph tags
- `noindex` on authenticated pages

## Landing Page
- One `<h1>`, hierarchy h2 → h3
- `SoftwareApplication` JSON-LD schema
- `FAQPage` JSON-LD schema
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

## robots.txt and sitemap.xml
Auto-generated via Next.js `app/robots.ts` and `app/sitemap.ts`.
