# Khahare Eco Tours — Project Context

## Purpose and current state

I am rebuilding the Khahare Eco Tours website completely from scratch. The current production website is a WordPress site at <https://www.khahareecotours.com/> and must remain live and untouched while the replacement is developed.

The project repository is <https://github.com/Bishwas-Cdy/khahare-eco-tours>. My local checkout is `~/Projects/khahare-eco-tours`.

The rebuild exists to replace long-term WordPress customization with a purpose-built site that is visually exceptional, fast, accessible, SEO-safe, maintainable, and inexpensive to operate. It should not inherit the feel or technical constraints of a generic tourism theme, mass-market booking portal, dashboard, or UI showcase.

One of the client's strongest requirements is a highly premium animated experience. VELORA, a recently completed hospitality project, is a quality reference for polish, spacing, typography, image treatment, animation quality, pacing, and editorial composition. It is a quality benchmark only: the new site must not copy VELORA's brand or layout.

Khahare Eco Tours needs its own identity rooted in Nepal, travel, nature, culture, adventure, responsible tourism, local expertise, authenticity, and human connection.

## Experience goals

The site should feel:

- premium, cinematic, calm, and sophisticated;
- editorial, intentional, nature-focused, and trustworthy;
- modern without being trend-dependent;
- human rather than corporate or transactional;
- rich in motion without becoming distracting or slow.

Photography, typography, whitespace, scale, composition, pacing, and restrained motion should carry the design. Avoid clutter, excessive gradients, pervasive glassmorphism, excessive rounded cards, random badges, generic icon grids, cheap hover effects, and animation used only for novelty.

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

Animation is a core part of the experience and should be designed into layouts and interactions from the beginning. Appropriate techniques include masked text reveals, staggered typography, hero image movement, subtle scaling, parallax, clipped image reveals, scroll-linked transformations, tasteful pinned narratives, section transitions, navigation transitions, refined hover movement, and choreographed timelines.

Motion should remain restrained and purposeful. Avoid bouncing interfaces, random rotations, excessive movement, blocking intro sequences, scroll hijacking, and anything that interferes with reading or interaction. Prefer `transform` and `opacity` and use layout-affecting animation sparingly.

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
