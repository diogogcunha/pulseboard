---
name: seo-aeo
description: >
  Use when working on the landing page, public-facing pages, metadata,
  structured data (JSON-LD), robots.txt, or sitemap.xml.
---

# SEO and AEO Conventions for PulseBoard

<!-- WHY THIS SKILL EXISTS: The landing page and public-facing pages must be
     indexable by search engines AND AI answer engines (Perplexity, ChatGPT,
     Google AI Overviews). The two optimization targets are complementary but
     not identical. -->

## AEO vs SEO Distinction
**SEO**: Optimizes for Google's ranking algorithm (links, speed, structured data for rich snippets).
**AEO**: Optimizes for AI systems that extract factual answers (dense, authoritative prose; FAQ schemas;
`SoftwareApplication` schema; clear entity definitions).

Target both simultaneously on the landing page — they don't conflict.

## Required on Every Public Page
- Unique `<title>` tag (Next.js `generateMetadata` or `metadata` export)
- Unique `<meta name="description">`
- `canonical` URL in `<head>`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- `noindex` on authenticated pages

## Landing Page Specifics
- One `<h1>` — the primary keyword phrase
- Heading hierarchy: `<h1>` → `<h2>` (sections) → `<h3>` (subsections)
- `SoftwareApplication` JSON-LD schema in `<head>` or `<body>`
- `FAQPage` JSON-LD schema for the FAQ section
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

## Structured Data (AEO focus)
Use JSON-LD (not microdata). Place in `<script type="application/ld+json">`.
`SoftwareApplication` schema fields: `name`, `description`, `applicationCategory`,
`operatingSystem`, `offers`.

## robots.txt and sitemap.xml
Both auto-generated in Next.js:
- `app/robots.ts` → `GET /robots.txt`
- `app/sitemap.ts` → `GET /sitemap.xml`
Sitemap includes only public (non-authenticated) routes.

## Images
- `alt` text on all images (descriptive, not filename)
- `next/image` for automatic optimization
