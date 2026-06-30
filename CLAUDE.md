# Project: MN Legal (MN Advocates LLP)

Marketing site + headless content pipeline for a Nairobi boutique legal-tech & data-privacy law firm. Live at https://www.mnlegal.net.

## Repo Layout
- `mn-legal-web/` — Next.js 15 (App Router, React 19) marketing site. **All web work happens here.**
- `seo-pipeline/` — automated daily SEO blog pipeline (Claude Code skill → headless WordPress on Hostinger).
- WordPress (Hostinger, `wp.mnlegal.net`) is the headless CMS backend; the Next.js site renders its content.

## Commands (run inside `mn-legal-web/`)
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`  ← always run before committing TS changes

## Tech Stack
- Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS 4
- GSAP + Lenis (animation/smooth scroll), lucide-react (icons)
- Resend (contact form email), Zod (validation)
- Deployed via git push to `main` (Vercel-style auto-deploy)

## Conventions
- App Router. Server Components by default; add `'use client'` only when a component needs hooks, browser APIs, or event handlers.
- **Browser-only code (gtag, window, document) must live in a client component.** Server pages that need a tracked link delegate to a small client component (see `TeamContactCard.tsx`).
- Team data is centralized in `mn-legal-web/lib/team.ts` (`teamMembers`, `getTeamMemberBySlug`). Never redefine member lookups in pages.
- Tailwind utility classes inline; brand colors via CSS vars (`--mn-burgundy`, `--mn-navy`, `--mn-cream`).
- Commit messages: conventional prefixes (`feat:`, `fix:`), end with the Co-Authored-By trailer.

## Analytics — GA4 Lead Tracking (active workstream)
GA4 property **G-3NYD2MRHRL**, loaded in `mn-legal-web/app/layout.tsx`. Goal: measure every lead conversion.

**All lead actions fire a single `generate_lead` event** differentiated by the `lead_source` parameter:

| `lead_source` | Where it fires |
|---|---|
| `contact_form` | Consultation form submit (also sends `matter_type`, `contact_preference`) — `ContactSection.tsx` |
| `general_email_click` / `general_phone_click` / `whatsapp_click` | Main contact sidebar — `ContactSection.tsx` |
| `team_email_click` / `team_phone_click` / `team_linkedin_click` / `team_vcard_download` | Team profile page — `TeamContactCard.tsx`, `VCardButton.tsx` |
| `team_card_linkedin_click` | Homepage team grid LinkedIn icon — `TeamSection.tsx` |

Other events: `click_cta` (blog CTA, `ArticleCTA.tsx`), `page_not_found` (`not-found.tsx`).

**Custom dimensions to keep registered in GA4 (event scope, non-retroactive):** `lead_source`, `team_member`, `team_member_title`, `matter_type`, `contact_preference`. When adding a new tracked action, send params that map to these — and register any NEW param as a custom dimension in GA4 Admin, or it stays invisible in reports/Looker Studio.

**Pattern for new tracking:** guard with `if (typeof window !== 'undefined' && window.gtag)`, then `window.gtag('event', 'generate_lead', { lead_source, value: 1.0, currency: 'KES', ... })`.

Downstream: a Looker Studio dashboard plan (executive / lead funnel / team / audience / SEO pages) is the next deliverable once GA4 data flow is verified.

## Boundaries
- Never commit `.env` / secrets (Resend API key, etc.).
- Don't add dependencies casually — bundle size matters for a marketing site.
- Verify GA4 changes don't break the server/client component boundary (`npx tsc --noEmit`).
