---
version: alpha
name: MN Legal
description: The visual identity system for MN Advocates LLP — a Nairobi-based Legal Tech and Data Privacy law firm. The aesthetic is editorial, authoritative, and precise — combining deep navy institutional gravitas with burgundy as the signal of action and expertise.

colors:
  primary: "#8b1c3f"
  navy: "#1a2744"
  navy-deep: "#131d33"
  navy-mid: "#2d3e5f"
  burgundy: "#8b1c3f"
  burgundy-dark: "#6d1532"
  cream: "#f5f3ef"
  cream-dark: "#ede9e2"
  gray: "#3d4a5c"
  gray-light: "#c9c5bd"
  text-primary: "#333333"
  text-secondary: "#666666"
  text-on-navy: "#e0e4ee"
  text-on-navy-sub: "#b4bbd0"
  bg-primary: "#ffffff"
  heading-primary: "#1a2744"

typography:
  display-hero:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "80px"
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.1
  display-section:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "52px"
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.15
  display-card:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.7
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.2em"
    textTransform: uppercase
  label-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.25em"
    textTransform: uppercase
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.23em"
    textTransform: uppercase

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
  5xl: "96px"
  section: "120px"

rounded:
  none: "0px"

easing:
  expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  back: "cubic-bezier(0.34, 1.56, 0.64, 1)"

components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "#ffffff"
    typography: "button"
    rounded: "{rounded.none}"
    padding: "20px 40px"
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.text-on-navy}"
    typography: "button"
    rounded: "{rounded.none}"
    padding: "16px 40px"
  label-eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.burgundy}"
    typography: "label"
    rounded: "{rounded.none}"
  card:
    backgroundColor: "{colors.bg-primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "16px"
  section-dark:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.text-on-navy}"
    rounded: "{rounded.none}"
  section-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
  divider:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.none}"
---

# MN Legal — Design System

## 1. Overview

MN Legal is a Nairobi-based law firm at the intersection of law and technology. The brand communicates **precision, authority, and forward-thinking counsel** — qualities that must come through in every UI element.

The visual identity draws from two worlds: the gravitas of traditional legal institutions (deep navy, serif typography, structured grids) and the sharpness of a modern technology firm (tight labels, precise spacing, clean editorial layout). The result is a brand that signals credibility to established corporate clients while remaining approachable to tech founders and startups.

**Personality:** Authoritative but not cold. Precise but not sterile. Editorial but not academic.

**Core tension to preserve:** Display headings are italic Playfair Display — romantic, editorial, human. Everything else (labels, buttons, body) is Inter — functional, legible, modern. Never mix these roles. The contrast between them is the visual identity.

**Geographic and cultural context:** The firm is Kenyan and pan-African. The design does not use global "corporate blue" defaults. Navy (`#1a2744`) and burgundy (`#8b1c3f`) are deliberate departures that feel distinctive in the East African legal market.

---

## 2. Colors

### Primary Palette

**Navy `#1a2744`** — The primary background for hero sections, navbars, footers, and any surface that must read as institutional and trustworthy. This is the "stage" color — it makes everything placed on it feel important.

**Burgundy `#8b1c3f`** — The firm's signature accent. Used for: calls to action, active states, eyebrow labels, decorative dividers, hover indicators, and the left-border accent on cards. Burgundy is the color of *action and expertise* — wherever the user should look, act, or focus, burgundy appears.

**Cream `#f5f3ef`** — The warm off-white used for alternating section backgrounds, tag chips, callout boxes, and table row stripes. Never use pure white (`#ffffff`) for interior section backgrounds — use cream. Pure white is only for the main page background.

### Semantic Roles

| Token | Value | Role |
|---|---|---|
| `navy` | `#1a2744` | Primary dark surface, headings |
| `navy-deep` | `#131d33` | Overlays, deepest dark surface |
| `navy-mid` | `#2d3e5f` | Gradients, secondary dark surface |
| `burgundy` | `#8b1c3f` | CTAs, active states, accent |
| `burgundy-dark` | `#6d1532` | Burgundy hover state only |
| `cream` | `#f5f3ef` | Warm light surface |
| `cream-dark` | `#ede9e2` | Borders, dividers on cream |
| `text-primary` | `#333333` | Body copy on white/cream |
| `text-secondary` | `#666666` | Supporting copy, captions |
| `text-on-navy` | `rgba(255,255,255,0.88)` | Primary text on navy |
| `text-on-navy-sub` | `rgba(255,255,255,0.62)` | Secondary text on navy |
| `bg-primary` | `#ffffff` | Page background |
| `heading-primary` | `#1a2744` | All headings on light surfaces |

### Color Interactions

Burgundy on navy is the **signature combination** — used in section eyebrow labels on dark backgrounds, active navigation indicators, and decorative grid overlays (`rgba(139,28,63,0.02)` opacity on navy creates a subtle dot-grid pattern).

Never use burgundy as a large area background. It is always an accent — borders, dots, icons, small labels, button fills. Burgundy fills are only acceptable for primary CTA buttons.

---

## 3. Typography

The system uses exactly two typefaces. No others may be introduced.

### Playfair Display — Display Font
Used for: all section headings (H1, H2), article titles, card headings, pull quotes, blockquotes, the firm logo wordmark.

Playfair Display is **always italic** in display contexts (hero headings, section H2s). Non-italic Playfair is used only for card headings and smaller display elements where italic would feel excessive.

| Level | Size | Weight | Style | Use |
|---|---|---|---|---|
| Display Hero | `clamp(40px, 7vw, 80px)` | 400 | Italic | Hero H1 |
| Display Section | `clamp(32px, 5vw, 52px)` | 400 | Italic | Section H2 headings |
| Display Card | `22px` | 600 | Normal | Card titles, sidebar headings |
| Display Article H2 | `28px` | 600 | Normal | Article body subheadings |
| Display Article H3 | `20px` | 600 | Normal | Article body sub-subheadings |

### Inter — Body Font
Used for: body copy, labels, buttons, navigation, captions, tags, form fields, metadata.

Inter is **never italic** in UI contexts. Italic Inter is only permitted in supporting prose (article body) where semantic emphasis is needed.

| Level | Size | Weight | Use |
|---|---|---|---|
| Body Large | `18px` | 500 | Lead paragraphs, feature descriptions |
| Body Medium | `16px` | 400 | Standard body copy |
| Body Small | `15px` | 400 | Supporting copy, sidebar text |
| Label | `11px` | 700 | Section eyebrow labels |
| Label Small | `10px` | 700 | Card labels, metadata |
| Button | `13px` | 700 | All CTA buttons |
| Caption | `12px` | 500 | Dates, read times, meta |

### Label System
Eyebrow labels above section headings follow a strict pattern: uppercase, 11px or 10px, Inter Bold, letter-spacing `0.2em`–`0.25em`, burgundy color. This is the most repeated typographic pattern on the site — it signals "here is a new section topic."

---

## 4. Layout

### Grid
Maximum content width: `1400px`, centred, with `px-6 md:px-16` responsive horizontal padding (`24px` mobile, `64px` desktop).

Article/reading content max width: `740px`. This is the measured optimal line length for Inter at 16px/1.85 line-height.

### Section Rhythm
Sections alternate between navy, cream, and white backgrounds. The standard vertical padding is `py-24` (`96px`) for standard sections and `py-32` (`128px`) for hero and team sections. Never reduce section padding below `py-16` (`64px`).

### Spacing Scale
The spacing scale follows an 8px base unit. All layout distances should be multiples of 8. The only exceptions are: label margins (`6px`, `4px`) and decorative micro-gaps.

### Responsive Breakpoints
- Mobile: `< 640px` — single column, reduced padding (`24px`)
- Tablet: `640px–1024px` — two-column grid for cards
- Desktop: `> 1024px` — full multi-column layouts, hero image visible

The hero image slideshow is hidden on tablet and below (`display: none` at `max-width: 1024px`). The text content fills full width in its place.

### Decorative Grid Overlay
Many dark sections use a background grid pattern: `linear-gradient(rgba(139,28,63,0.02) 1px, transparent 1px)` at `60px × 60px` or `80px × 80px` size. This is always `pointer-events: none`, `absolute inset-0`, and low opacity — a textural detail, not a structural element.

---

## 5. Elevation & Depth

The design uses **anti-elevation** — darker surfaces feel "deeper," not higher. Components on navy feel grounded and permanent. Components on cream or white feel active and approachable.

### Shadow Usage
Shadows are used **sparingly** and only on floating image containers. The hero article featured image uses: `box-shadow: 0 32px 80px rgba(26,39,68,0.35)` — a navy-tinted deep shadow that roots the image in the page.

Cards do NOT use shadows at rest. Hover states on cards use `hover:shadow-2xl` only.

### Visual Hierarchy Through Opacity
On navy backgrounds, text hierarchy is built through opacity, not size:
- Primary text: `rgba(255,255,255,0.88)`
- Secondary text: `rgba(255,255,255,0.62)`
- Tertiary / metadata: `rgba(255,255,255,0.40)–0.45`
- Decorative / watermark text: `rgba(255,255,255,0.04)`

### Sticky Sidebar
The article sidebar uses `sticky top-24` — stays on screen as the reader scrolls. This is the only sticky element in the design.

### Hero Image Clip-Path
The hero slideshow image uses a custom `clip-path` polygon that creates an organic left edge blending into the navy background. Combined with a `linear-gradient` overlay fading from `#1a2744` to transparent, the image appears to grow from the background rather than sitting on top of it. This is a signature visual effect unique to the brand.

---

## 6. Shapes

**All corners are sharp. No exceptions.**

```css
* { border-radius: 0 !important; }
```

This is the most critical visual rule of the brand. Rounded corners signal approachability and casualness. MN Legal signals precision and authority — sharp corners reinforce this. Every button, card, image container, input field, badge, and modal must have zero border radius.

The only "curves" in the design are:
- The hero image `clip-path` polygon (not a border-radius — a custom geometric cut)
- Circular team member avatars (`border-radius: 50%`) — a deliberate exception because circular portraits are a photographic convention, not a UI element
- Decorative circles used as abstract background elements in section headers (pure decoration, not interactive elements)

If a third-party component introduces border radius, it must be overridden to `0`.

---

## 7. Components

### Button — Primary
Burgundy fill, white uppercase Inter Bold text at 13px, 3px letter-spacing. Full-width on mobile. Padding: `py-5 px-10` (`20px × 40px`). No border-radius. Hover: darkens to `#6d1532` over 500ms. Disabled: `opacity-50 cursor-not-allowed`.

Never use the primary button for navigation or non-committal actions. Reserve it for: form submission, consultation requests, download CTAs.

### Button — Secondary (Ghost)
Transparent background with `border: 1px solid rgba(255,255,255,0.30)`. Used on dark (navy) backgrounds only. Hover inverts: white background, navy text. The inversion over 500ms is intentional — it feels like a reveal, matching the brand's editorial pacing.

### Eyebrow Label
Burgundy, 11px, uppercase, Inter 700, `letter-spacing: 0.2em`, displayed as a block element above every section heading. Always precedes an H2. Never used standalone without a heading following it.

### Card
White background, no border at rest, `hover:border hover:border-[#ede9e2]`, `hover:shadow-2xl`, `padding: 16px`. On hover, a burgundy left border appears via `border-l-[3px] border-[#8b1c3f]` transition. The left border accent on hover is the card's identity signal — it echoes the decorative left-border pattern used in article callouts and blockquotes.

### Form Fields
Transparent background, `border-bottom` only (no full border box). White text on navy context. Burgundy `border-bottom` on focus. No border-radius. This stripped-down field style signals that the form is part of the brand environment, not a generic form dropped in.

### Article Callout Box
Cream background, `border-left: 4px solid #8b1c3f`, `padding: 24px 32px`. Used to highlight key insights in article body. The 4px left border is the heaviest use of burgundy as a border — reserved for content that must command attention.

### Blockquote
Playfair Display italic, 22px, navy heading colour, `border-left: 3px solid #8b1c3f`. Citation line: Inter 700, 12px, uppercase, `letter-spacing: 2px`, burgundy. The combination of Playfair italic + burgundy border is the strongest typographic signal in the content system.

### Team Member Card
Portrait image with `grayscale(30%)` at rest, transitioning to full colour on hover (`grayscale-0`). Cinematic overlay gradient fades at rest, disappears on hover. Name in Playfair, title in burgundy uppercase label, practice in Inter small. LinkedIn icon appears bottom-right of the text block — `w-7 h-7`, bordered square, grey at rest, LinkedIn blue (`#0A66C2`) on hover.

### Navigation Label — Active State
A `2px` burgundy dot or border-bottom indicator. Navigation text does not bold or change size on active — only the burgundy accent changes. This restraint keeps the navigation quiet.

---

## 8. Do's and Don'ts

### Typography
- **DO** use Playfair Display italic for all section H2 headings
- **DO** use eyebrow labels (burgundy uppercase Inter) before every section H2
- **DO** maintain the display/body contrast — the system's identity depends on it
- **DON'T** use Playfair Display for body text, labels, or buttons
- **DON'T** use Inter for headings
- **DON'T** add a third typeface — not even for code blocks or special sections

### Color
- **DO** use burgundy as an accent — borders, dots, labels, button fills
- **DO** alternate sections between navy, cream, and white to create rhythm
- **DO** use cream (`#f5f3ef`) for warm light surfaces, not grey (`#f9f9f9` etc.)
- **DON'T** use burgundy as a large area background
- **DON'T** use pure black (`#000000`) anywhere — use navy (`#1a2744`) instead
- **DON'T** use generic corporate blues — the navy/burgundy pairing is the differentiator

### Shapes
- **DON'T** add border-radius to any interactive UI element
- **DON'T** allow rounded corners from third-party components to persist unstyled
- **DO** use circular avatars for team portraits only (photographic convention)
- **DO** use sharp clip-path polygons for image framing effects

### Spacing & Layout
- **DO** use multiples of 8px for all spacing values
- **DO** cap reading content at `740px` wide
- **DO** use `max-w-[1400px]` for full-width section containers
- **DON'T** reduce section vertical padding below `64px`
- **DON'T** centre-align body text — left-align only (except hero headlines)

### Motion
- **DO** use `cubic-bezier(0.16, 1, 0.3, 1)` (expo ease out) for scroll reveals and transitions — it feels precise and intentional
- **DO** keep transition durations between `300ms` (micro) and `1200ms` (reveals)
- **DON'T** use bounce or elastic easing on legal/professional UI components
- **DON'T** animate on every interaction — motion should signal meaning, not decoration
- **DO** respect `prefers-reduced-motion` — the hero slideshow already handles this; all new animations must too

### Brand Voice in UI
- **DO** write button labels in the brand voice: "Submit Inquiry", "Consult our Experts", "Initiate Consultation"
- **DON'T** use generic SaaS microcopy: "Get Started", "Learn More", "Click Here", "Sign Up"
- **DO** write section eyebrow labels as status markers: "Direct Access", "Our Professionals", "Legal Authority"
- **DON'T** use emoji in UI text — the brand is formal
