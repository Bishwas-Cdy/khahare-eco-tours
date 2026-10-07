# Khahare Eco Tours

A complete rebuild of the [Khahare Eco Tours production website](https://www.khahareecotours.com/), developed in [Bishwas-Cdy/khahare-eco-tours](https://github.com/Bishwas-Cdy/khahare-eco-tours).

**Status:** Active development. The existing WordPress site remains the live production site while the replacement is built and tested.

## Goals

Create a premium, cinematic, animation-rich travel website that remains fast, responsive, accessible, SEO-safe, maintainable, and inexpensive to operate. The experience should express Nepal, nature, culture, adventure, responsible tourism, local expertise, authenticity, and human connection.

## Stack

- Astro and TypeScript
- Semantic HTML and native CSS
- GSAP, ScrollTrigger, and Lenis for purposeful motion
- Swiper only where a genuine slider is needed
- Cloudflare static hosting, CDN, DNS, HTTPS, Workers, and Turnstile
- Resend for enquiry email delivery

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
```

Codex must start the development server in background mode as documented in `AGENTS.md`.

## Intended structure

```text
src/
├── components/
├── content/{blog,reviews,tours,treks}/
├── data/
├── layouts/
├── pages/
├── scripts/
├── styles/
└── utils/

public/
├── fonts/
├── images/
└── video/
```

## Documentation

- [`AGENTS.md`](AGENTS.md): canonical Codex instructions and engineering constraints
- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md): detailed project handoff and current direction
- [`DECISIONS.md`](DECISIONS.md): accepted architectural and product decisions

## Infrastructure

The replacement is static-first and intended for Cloudflare hosting. Dynamic enquiry submission will use a Cloudflare Worker, Turnstile, and Resend. No database or CMS is planned initially. The target recurring infrastructure cost is effectively NPR 0 beyond domain renewal.

## Production safety

Do not change DNS, nameservers, hosting, WordPress, production email records, or the production domain connection during development. Migration requires a complete, tested, approved replacement, an SEO redirect plan, and a rollback plan.
