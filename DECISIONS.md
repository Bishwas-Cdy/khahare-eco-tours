# Decision Log

This log records accepted product and technical decisions for the Khahare Eco Tours rebuild.

## 2026-10-07 — Rebuild from scratch

**Status:** Accepted

The existing WordPress site will be replaced with a purpose-built implementation instead of receiving long-term WordPress customization. This provides direct control over performance, design quality, accessibility, animation, and maintainability.

## 2026-10-07 — Astro and TypeScript frontend

**Status:** Accepted

Astro and TypeScript provide a content-oriented, strongly typed foundation with minimal client-side JavaScript and reusable components.

## 2026-10-07 — Static-first architecture

**Status:** Accepted

Pages should be generated as HTML at build time wherever practical. This improves speed, reliability, SEO, security, and operating cost while leaving dynamic behavior to focused endpoints.

## 2026-10-07 — GSAP, ScrollTrigger, and Lenis animation stack

**Status:** Accepted

GSAP and ScrollTrigger provide the control needed for refined, choreographed motion, while Lenis may provide smooth scrolling when it improves the experience without harming usability or accessibility.

## 2026-10-07 — Premium cinematic visual direction

**Status:** Accepted

The client requires a highly premium animated website. The design will emphasize photography, typography, whitespace, editorial composition, pacing, and restrained motion while retaining a distinct Nepal travel identity.

## 2026-10-07 — Brand-level rebuild with broad creative freedom

**Status:** Accepted

The existing WordPress site is a factual, content, and SEO source—not a visual reference. Major pages may be redesigned from first principles, preserving verified truth and valuable URLs while replacing old design decisions with a bespoke, premium experience subject to accessibility, usability, performance, mobile quality, security, and maintainability.

## 2026-10-07 — Cloudflare infrastructure

**Status:** Accepted

Cloudflare static hosting, CDN, DNS, HTTPS, and Workers support a fast, secure, globally distributed site that should remain within free tiers at the expected scale.

## 2026-10-07 — Worker, Turnstile, and Resend enquiry system

**Status:** Accepted

Enquiries will pass through Cloudflare Turnstile and a validating Cloudflare Worker before Resend delivers them to the client inbox. This keeps secrets server-side and provides focused anti-spam protection.

## 2026-10-07 — No database initially

**Status:** Accepted

The initial site does not require persistent application data. Avoiding a database reduces cost, security exposure, operational work, and architectural complexity.

## 2026-10-07 — No CMS initially

**Status:** Accepted

Content will be maintained in the repository and deployed through Git. A CMS will be evaluated later only if independent client editing becomes a genuine requirement.

## 2026-10-07 — Curated reviews

**Status:** Accepted

Reviews will be curated repository content rather than public uploads. This avoids moderation, spam, upload security, user-generated-content, and database complexity.

## 2026-10-07 — Preserve SEO and URLs during migration

**Status:** Accepted

Existing public URLs have search value. The migration requires a complete crawl, an old-to-new URL map, preserved slugs where sensible, and 301 redirects wherever paths change.

## 2026-10-07 — Production WordPress remains untouched during development

**Status:** Accepted

The live WordPress site, hosting, DNS, domain connection, and email records will not change until the replacement is complete, tested, approved, and supported by a rollback plan.

## 2026-10-07 — GitHub repository

**Status:** Accepted

The canonical source repository is `Bishwas-Cdy/khahare-eco-tours` on GitHub, providing the versioned source and deployment workflow.

## 2026-10-07 — Codex is the primary coding agent

**Status:** Accepted

Codex is the coding agent used for this project so that project instructions, context, and implementation workflow remain focused on one agent environment.

## 2026-10-07 — AGENTS.md is canonical

**Status:** Accepted

`AGENTS.md` is the canonical coding-agent instruction file and must be read before project work so that safety, architecture, design, and workflow constraints remain consistent.

## 2026-10-07 — CLAUDE.md is intentionally not used

**Status:** Accepted

`CLAUDE.md` has been deliberately removed because Codex is the sole coding agent in use. It should remain absent to avoid conflicting or redundant agent instructions.
