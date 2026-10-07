# Codex Project Instructions

This is the canonical instruction file for Codex work in this repository. Read it before making changes, together with `PROJECT_CONTEXT.md` and `DECISIONS.md` when the task depends on project history or architecture.

## Project ownership and communication

This project belongs to a sole developer. In project documentation and implementation notes, use first-person singular where appropriate: “I,” “my,” and “me.” Do not describe Codex as a project co-owner by using “we,” “our,” or “us.”

## Project goal

Rebuild the existing Khahare Eco Tours WordPress site from scratch as an extremely premium, animation-rich, cinematic, editorial, modern, fast, responsive, accessible, SEO-safe, maintainable, and inexpensive website.

The client places particular importance on a premium animated experience. VELORA, a recent hospitality project, is a quality benchmark for polish, spacing, typography, image treatment, animation quality, page pacing, and editorial composition. Do not copy its brand or layout.

Preserve a distinct Khahare Eco Tours identity grounded in Nepal, travel, nature, culture, adventure, responsible tourism, local expertise, authenticity, and human connection. Do not produce a generic WordPress tourism template, mass-market booking portal, dashboard, or UI component showcase.

## Design and migration rule

The production WordPress website is a content and factual source, not a visual reference. This is a complete brand-level, visual, and experiential rebuild—not a WordPress redesign or visual migration.

**Core rule: Preserve truth and SEO value, not old design decisions.**

Preserve only material with real value: verified company and trip information, useful reviews, contact and legal details, valid travel guidance, suitable rights-cleared photography, and public URLs worth retaining for SEO. Existing URLs may remain while their page designs are replaced completely.

Do not preserve an old layout, section order, navigation model, typography, color palette, visual hierarchy, card style, page composition, image treatment, footer, mobile layout, transition, interaction pattern, or animation language merely because it exists. Major pages may be designed from first principles within the constraints of factual accuracy, SEO, accessibility, usability, performance, mobile quality, security, and maintainability.

## Production safety

The current WordPress website at <https://www.khahareecotours.com/> remains live during development. Unless I explicitly instruct it, never:

- change production DNS or nameservers;
- transfer the domain;
- cancel current hosting;
- delete or alter the production WordPress site;
- modify production email DNS;
- connect the replacement to the production domain; or
- perform any destructive production action.

Migration may happen only after the replacement is complete, tested, approved, and covered by a rollback plan. Never recommend automatic infrastructure changes that bypass this process.

## Accepted technical direction

Use:

- Astro and TypeScript;
- semantic HTML, native CSS, and native browser APIs;
- GSAP, ScrollTrigger, and SplitText where useful;
- GSAP Flip where useful and MorphSVG only when justified;
- Lenis where smooth scrolling genuinely improves the experience;
- Swiper only for a genuine carousel or slider;
- GitHub and Cloudflare static hosting, CDN, DNS, and HTTPS;
- Cloudflare Workers for dynamic endpoints;
- Cloudflare Turnstile and Resend for enquiry/contact delivery.

Do not introduce React, Vue, Svelte, Next.js, Tailwind, Bootstrap, jQuery, WordPress, PHP, a CMS, a database, a continuously running Node server, or paid SaaS dependencies without a genuine requirement.

Before proposing a dependency:

1. Check whether native browser functionality is sufficient.
2. Check whether an existing dependency already solves the problem.
3. Explain the practical benefit before adding it.

The intended recurring infrastructure cost is effectively NPR 0. The only expected mandatory recurring cost is domain renewal, approximately NPR 2,000–3,000 per year. Keep the architecture comfortably inside free tiers at the expected scale without compromising reliability, security, SEO, performance, or maintainability.

## Architecture

The site is static-first. Generate HTML at build time whenever practical. Dynamic behavior should primarily be limited to enquiry/contact submission.

Tours, treks, blog articles, and reviews should be structured content rendered through reusable Astro layouts and components. Avoid duplicated page markup. Centralize shared site information, navigation, company details, contact details, social links, and metadata/configuration where appropriate.

The intended source structure is:

```text
src/
├── components/
├── content/
│   ├── blog/
│   ├── reviews/
│   ├── tours/
│   └── treks/
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

Do not significantly reorganize this structure without a concrete architectural benefit.

## Design direction

The visual experience should feel like a luxury expedition brand, a high-end hospitality experience, an editorial travel publication, and a carefully art-directed digital experience. It should remain premium, cinematic, calm, sophisticated, intentional, nature-focused, trustworthy, human, authentic, and distinctly Nepal-focused.

Build quality through exceptional photography, typography, whitespace, scale, visual hierarchy, asymmetric editorial composition, pacing, authentic content, and restrained but sophisticated motion. Avoid anything that resembles an AI-generated site, generic trekking template, typical WordPress tourism site, component-library demo, mass-market booking portal, or collection of unrelated animated sections.

Avoid common synthetic design patterns: excessive rounded cards, generic gradients, ubiquitous glassmorphism, meaningless icon grids, fake statistics, vague luxury slogans, excessive centered layouts, repetitive section structures, nonspecific “Discover / Explore / Journey” copy, cheap hover effects, and animation without purpose.

Use references by purpose. Study Intrepid Travel, G Adventures, and other strong adventure operators for trip architecture, conversion, and usability. Study &Beyond, Black Tomato, Explora, premium hospitality and expedition brands, and usable editorial/Awwwards-level work for visual direction and storytelling. Do not copy any one site. Combine luxury hospitality restraint, expedition storytelling, strong trip information architecture, and sophisticated GSAP-level motion while keeping the identity locally grounded.

## Animation

Animation is a core requirement and should be designed into the experience from the start. The guiding principle is: **motion everywhere in the experience, not animation on every element.**

Use motion at several levels:

- page level: introductions, transitions, navigation, hero choreography, and scroll progression;
- section level: image reveals, parallax, pinned storytelling, layered movement, and scroll-linked transformations;
- component level: trip cards, buttons, galleries, itineraries, and review interactions;
- micro-interactions: hover movement, underlines, arrows, appropriate cursor responses, and tasteful magnetic effects; and
- cinematic moments: fullscreen trek introductions, scroll-driven stories, itinerary storytelling, destination transitions, route/map sequences, and large image-led sections.

Masked text reveals, staggered typography, subtle scale changes, clipping, and carefully choreographed timelines may support these levels where they serve the story.

Motion must remain intentional, smooth, performant, usable, and accessible. Avoid bouncing interfaces, random rotations, excessive motion, long blocking introductions, scroll hijacking, noisy or gimmicky effects, nausea-inducing motion, effects that impair reading, and animation pasted onto every element. Prefer `transform` and `opacity`; animate layout-affecting properties sparingly.

Always respect `prefers-reduced-motion`. Mobile does not need to reproduce every desktop effect. Reduce animation when mobile usability, performance, or accessibility requires it.

## Performance and media

Performance is part of the design quality. Do not trade speed for animation.

- Resize and optimize images, provide responsive sizes, prefer AVIF/WebP where appropriate, and lazy-load noncritical media.
- Never deploy original camera-resolution files blindly.
- Keep ambient video short, aggressively compressed, muted when autoplaying, and paired with a poster image.
- Use conservative video behavior on mobile and avoid oversized media files.
- Keep JavaScript bundles small and avoid loading animation code on pages that do not need it when practical.

## Content integrity

Potential structured trip fields include title, slug, type, duration, difficulty, maximum altitude, start point, end point, destinations, best season, hero image, gallery, overview, highlights, itinerary, inclusions, exclusions, accommodation, meals, practical information, and featured status.

Never fabricate travel facts. Flag missing, contradictory, outdated, or uncertain information instead of inventing data. The existing WordPress site contains known gaps and inconsistencies, including incomplete duration values in some package summaries, so do not copy it blindly.

## Enquiries, reviews, and content management

The planned enquiry flow is:

```text
visitor
→ enquiry/contact form
→ Cloudflare Turnstile
→ Cloudflare Worker
→ validation and anti-spam checks
→ Resend
→ client inbox
```

Trip pages should be able to preselect the relevant tour or trek when opening an enquiry. A database is not currently required.

Never expose Resend API keys, Turnstile secret keys, Cloudflare credentials, or any other secret to browser code or Git. Use server-side environment variables or bindings.

Do not initially rebuild public review submission. Reviews are curated repository content, avoiding database, moderation, upload security, spam, and user-generated-content complexity.

There is no CMS initially. Content is edited in the repository, committed, pushed, and deployed. Evaluate a CMS later only if independent client editing becomes a genuine requirement.

## SEO and migration

SEO preservation is mandatory. Treat existing public URLs as assets, preserve current slugs where sensible, and do not casually rename routes such as `/tour/`, `/trek/`, `/mardi-himal-trek/`, `/ghorepani-poon-hill-trek/`, `/pokhara-tour/`, `/airbnb/`, and `/volunteering/`.

Before production migration:

- crawl the full production site;
- record every meaningful public URL;
- build an old-to-new URL map;
- preserve useful paths and add 301 redirects where paths change;
- generate `sitemap.xml` and `robots.txt`;
- configure canonical URLs, titles, meta descriptions, and Open Graph metadata;
- add appropriate structured data;
- verify internal links and locate broken links; and
- verify Google Search Console after launch.

Never remove an indexed route without evaluating a replacement or redirect.

## Accessibility and responsive design

Use semantic HTML. Maintain keyboard access, visible focus states, logical heading order, meaningful alt text, readable contrast, accessible navigation, and accessible forms. Animation must never prevent access to content.

Design intentionally for small mobile, large mobile, tablet, laptop, desktop, and large desktop. Do not merely shrink desktop layouts. Adapt typography, spacing, image crops, navigation, animation, pinned sections, and interaction behavior for each context.

## Code quality

Prefer semantic HTML, strongly typed TypeScript, simple solutions, reusable Astro components, readable CSS, descriptive naming, focused utilities, and progressive enhancement.

Avoid premature abstraction, giant monolithic components, duplicated CSS, scattered magic numbers, unnecessary `!important`, and unrelated refactoring during focused work.

## Development workflow

Current environment:

- Fedora Linux 44
- Node.js 22.23.1
- npm 10.9.8
- Git, GitHub CLI, and Codex
- local path: `~/Projects/khahare-eco-tours`

When starting the Astro development server, use background mode:

```sh
astro dev --background
```

Manage it with:

```sh
astro dev status
astro dev logs
astro dev stop
```

Consult the relevant official Astro guide before related work:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styles and CSS](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)

Do not build every page immediately. Establish the project foundation, design tokens, typography, spacing, color system, base layout, navigation, and animation infrastructure first. Then build the homepage and one exceptional trip detail page to set the quality bar and reusable patterns.

## Git and change discipline

Keep commits focused and descriptive, for example:

- `feat: build homepage hero`
- `feat: add tour content collection`
- `feat: implement enquiry form`
- `style: refine destination transitions`
- `fix: correct mobile navigation overflow`
- `perf: optimize hero media`
- `seo: add canonical metadata and sitemap`
- `docs: update project context`

Never commit secrets or real credentials. Do not commit or push unless I explicitly request it. Preserve `CLAUDE.md` as intentionally absent; Codex is the primary coding agent and `AGENTS.md` is the sole canonical coding-agent instruction file.
