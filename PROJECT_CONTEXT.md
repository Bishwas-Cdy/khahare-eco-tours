# Khahare Eco Tours — Project Context

## Purpose and current state

I am rebuilding the Khahare Eco Tours website completely from scratch. The current production website is a WordPress site at <https://www.khahareecotours.com/> and must remain live and untouched while the replacement is developed.

The project repository is <https://github.com/Bishwas-Cdy/khahare-eco-tours>. My local checkout is `~/Projects/khahare-eco-tours`.

The rebuild exists to replace long-term WordPress customization with a purpose-built site that is visually exceptional, fast, accessible, SEO-safe, maintainable, and inexpensive to operate. It should not inherit the feel or technical constraints of a generic tourism theme, mass-market booking portal, dashboard, or UI showcase.

One of the client's strongest requirements is a highly premium animated experience. VELORA, a recently completed hospitality project, is a quality reference for polish, spacing, typography, image treatment, animation quality, pacing, and editorial composition. It is a quality benchmark only: the new site must not copy VELORA's brand or layout.

Khahare Eco Tours needs its own identity rooted in Nepal, travel, nature, culture, adventure, responsible tourism, local expertise, authenticity, and human connection.

## Design and migration philosophy

The existing WordPress website is not a visual reference for the replacement. It tells me what the business is; it does not determine what the new website should look like. Its primary value is as a content and factual source.

This project is not a WordPress redesign or visual migration. It is a brand-level rebuild and a complete reinvention of the visual and experiential system.

**Core rule: Preserve truth and SEO value, not old design decisions.**

Material worth preserving includes:

- factual company information;
- verified tour and trek information;
- useful reviews and testimonials;
- contact details;
- legal and business information;
- valid travel information;
- useful photographs when their rights and quality are suitable; and
- existing public URLs where retaining them benefits SEO.

Old visual decisions have no default claim on the new experience. The rebuild may completely reinvent the homepage structure, navigation, typography, color palette, section composition, page rhythm, image treatment, tour cards, trip detail pages, blog and review presentation, contact experience, footer, mobile layouts, page transitions, interaction patterns, and animation language.

Existing URLs can remain while the design, structure, and experience of the corresponding pages are replaced completely.

## Creative freedom and constraints

Creative freedom is intentionally broad. There is no requirement to preserve an existing layout, section order, card style, visual hierarchy, or page composition. Major pages should be designed from first principles when doing so creates a better result.

The meaningful constraints are factual accuracy, SEO preservation, accessibility, usability, performance, mobile quality, security, and maintainability.

## Experience goals

The target is an extremely premium, bespoke experience. The site should feel like:

- a luxury expedition brand;
- a high-end hospitality experience;
- an editorial travel publication; and
- a carefully art-directed digital experience.

It must remain cinematic, calm, modern, sophisticated, nature-focused, trustworthy, human, and locally grounded rather than corporate or transactional. It should not feel like an AI-generated website, a generic trekking template, a typical WordPress tourism site, a component-library demo, a mass-market booking portal, or a collection of random animated sections.

Premium quality should come from exceptional photography, typography, whitespace, composition, asymmetric/editorial layouts, pacing, visual hierarchy, restrained but sophisticated motion, strong Nepal-specific identity, and authentic content.

Avoid excessive rounded cards, generic gradient backgrounds, glassmorphism everywhere, meaningless icon grids, fake statistics, vague luxury slogans, excessive centered layouts, repetitive section structures, stock “Discover / Explore / Journey” copy without specificity, and animation applied without purpose.

## Reference strategy

Use different references for different jobs:

- For trip architecture, conversion, and usability, study Intrepid Travel, G Adventures, and other high-quality adventure operators.
- For premium visual direction and storytelling, study &Beyond, Black Tomato, Explora, high-end hospitality and expedition brands, and strong editorial or Awwwards-level interactive work where usability remains good.

No reference should be copied directly. The intended combination is luxury hospitality restraint, premium expedition storytelling, strong adventure-trip information architecture, and sophisticated GSAP-level motion. The result must remain distinctly Nepal-focused, nature-focused, human, authentic, and locally grounded.

## Architecture and content model

The architecture is static-first. Astro should generate HTML at build time wherever practical, with TypeScript, semantic HTML, native CSS, and native browser APIs forming the base. Dynamic functionality should primarily be limited to enquiry/contact handling.

Tours, treks, blog articles, and reviews should be structured repository content rendered through reusable Astro layouts and components. Shared navigation, company details, contact details, social links, site metadata, and configuration should be centralized where appropriate. Page markup should not be duplicated.

The intended project structure is:

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

Possible structured trip fields include:

- title, slug, type, and featured status;
- duration, difficulty, and maximum altitude;
- start point, end point, destinations, and best season;
- hero image and gallery;
- overview and highlights;
- itinerary;
- inclusions and exclusions;
- accommodation and meals; and
- practical information.

No travel facts should be fabricated. Missing, contradictory, outdated, or uncertain details must be flagged for review.

## Technology and dependencies

The accepted frontend is Astro with TypeScript, semantic HTML, native CSS, and native browser APIs.

The accepted motion stack is GSAP, ScrollTrigger, and Lenis. SplitText and GSAP Flip may be used where useful; MorphSVG requires a specific justification. Swiper is appropriate only where a real carousel or slider is needed.

React, Vue, Svelte, Next.js, Tailwind, Bootstrap, jQuery, WordPress, PHP, a CMS, a database, a continuously running Node server, and paid SaaS dependencies are not part of the initial architecture. Before adding any dependency, native browser functionality and existing dependencies should be evaluated first, and the practical benefit must be clear.

## Infrastructure, deployment, and cost

The intended infrastructure is:

- GitHub for source control;
- Cloudflare static hosting, CDN, DNS, and HTTPS;
- Cloudflare Workers for dynamic endpoints;
- Cloudflare Turnstile for bot protection; and
- Resend for enquiry/contact email delivery.

The expected recurring infrastructure cost is effectively NPR 0. The only expected mandatory recurring expense is domain renewal, approximately NPR 2,000–3,000 per year. Free tiers should comfortably serve the expected traffic, but zero cost must not take priority over reliability, security, SEO, performance, or maintainability.

The normal content workflow is edit, commit, push, and deploy. Production migration will occur only after the new site is complete, tested, approved, and paired with a rollback plan. Until then, the current WordPress site and all production DNS, email, hosting, and domain settings remain unchanged.

## Existing site and content inventory

The current site contains or references:

- Home;
- Tour and individual tour pages;
- Trek and individual trek pages;
- About and Contact;
- Airbnb;
- Ticketing;
- Volunteering;
- Travel Info and Know Before You Go;
- Visa information;
- trekking permit and TIMS information;
- Reviews and individual review pages;
- Blog/News;
- rafting and other activity content;
- booking-related routes; and
- team, company, and legal material.

This list is not a final route inventory. The full production site must be crawled before migration.

Tour examples already identified include Kathmandu Valley, Pokhara, Lumbini, Chitwan, Jomsom, Mustang, and Muktinath.

Trek examples already identified include Annapurna Base Camp, Ghorepani/Poon Hill, Mardi Himal, Dhampus–Sarangkot, Shivapuri, Langtang–Gosaikund, and Dhulikhel–Nagarkot–Changu Narayan.

The existing WordPress content is known to be incomplete or inconsistent in places. Some package summaries show incomplete duration values. Existing content is source material for review, not unquestioned canonical data.

## Enquiry system

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

Tour and trek pages should be able to preselect the relevant trip when an enquiry begins. A database is not required for this initial flow.

Resend API keys, Turnstile secret keys, Cloudflare credentials, and all other secrets must remain out of browser code and Git. They belong in server-side environment variables or platform bindings.

## Reviews and CMS

The replacement will not initially reproduce the public review-submission feature. Reviews will be curated as repository-managed content. This avoids a database, moderation workflows, upload security, spam handling, and other user-generated-content complexity.

There is no CMS initially. I will manage content in the repository through the normal Git workflow. If independent client editing becomes a genuine requirement later, CMS options can be evaluated at that time.

## Animation philosophy

Animation is a core part of the experience and should be designed into layouts and interactions from the beginning. The guiding principle is: **motion everywhere in the experience, not animation on every element.**

Motion should operate at multiple levels:

1. **Page-level motion:** page introductions, transitions, navigation, hero choreography, and scroll progression.
2. **Section-level motion:** image reveals, parallax, pinned storytelling, layered movement, and scroll-linked transformations.
3. **Component-level motion:** trip cards, buttons, galleries, itinerary sections, and review interactions.
4. **Micro-interactions:** hover movement, underlines, arrows, appropriate cursor responses, and magnetic effects only when tasteful.
5. **Cinematic moments:** fullscreen trek introductions, scroll-driven visual stories, itinerary storytelling, destination transitions, route or map sequences, and large image-led sections.

Masked text reveals, staggered typography, hero image movement, subtle scaling, clipping, and choreographed timelines may support these layers when they have a clear purpose.

Motion must remain intentional, smooth, performant, usable, and accessible. Avoid bouncing interfaces, random rotations, excessive movement, blocking intro sequences, scroll hijacking, noisy, gimmicky, or nauseating effects, and anything that interferes with reading or interaction. Do not animate every element merely because animation is available. Prefer `transform` and `opacity` and use layout-affecting animation sparingly.

`prefers-reduced-motion` must be respected. Mobile animation may be simplified or removed to protect usability, performance, and accessibility.

## Performance and accessibility expectations

Performance is part of the perceived visual quality and must not be sacrificed for animation.

Images should be correctly resized, responsive, optimized, and served as AVIF/WebP where appropriate. Noncritical images should be lazy-loaded. Original camera files should never be deployed without processing.

Ambient video, if used, should be short, aggressively compressed, muted for autoplay, paired with a poster, and handled conservatively on mobile. Oversized video files should be avoided.

JavaScript should stay lean, and page-specific animation code should not load globally when avoidable.

The interface must use semantic HTML, keyboard-accessible interactions, visible focus states, logical headings, useful alt text, readable contrast, accessible navigation, and accessible forms. Animation must never block content access.

Responsive design must be intentional across small mobile, large mobile, tablet, laptop, desktop, and large desktop. Typography, spacing, image crops, navigation, animation, pinned sections, and interaction patterns should adapt rather than simply shrink.

## SEO migration strategy

SEO preservation is mandatory. Existing public URLs are assets, and established slugs should be preserved where sensible. Known examples include:

- `/tour/`
- `/trek/`
- `/mardi-himal-trek/`
- `/ghorepani-poon-hill-trek/`
- `/pokhara-tour/`
- `/airbnb/`
- `/volunteering/`

Before launch:

1. Crawl the complete production site and record meaningful public URLs.
2. Build an explicit old-to-new URL map.
3. Preserve useful routes and create 301 redirects for changed paths.
4. Generate `sitemap.xml` and `robots.txt`.
5. Configure canonical URLs, page titles, meta descriptions, and Open Graph data.
6. Add appropriate structured data.
7. Verify internal links and identify broken links.
8. Verify the migration in Google Search Console after launch.

No indexed route should disappear without considering its replacement or redirect.

## Development environment

- Fedora Linux 44
- Node.js 22.23.1
- npm 10.9.8
- Git
- GitHub CLI
- Codex as the primary coding agent

`AGENTS.md` is the canonical coding-agent instruction file. `CLAUDE.md` is intentionally not used and must remain absent.

## Immediate development plan

The project should establish a focused quality foundation before expanding to every page:

1. Project foundation
2. Design tokens and system
3. Typography
4. Spacing
5. Color system
6. Base layout
7. Navigation
8. Animation infrastructure
9. Homepage
10. One exceptional trip detail page

The homepage and first trip detail page should establish the visual quality bar, motion language, and reusable patterns for the rest of the site.
