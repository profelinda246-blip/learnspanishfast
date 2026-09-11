# Handoff: Learn Spanish Fast hoy — website redesign

## Overview
A four-page redesign of learnspanishfasthoy.com, a one-instructor Spanish school
(Profe Linda Ward, Central Coast, California) teaching adult learners via Zoom
using the TPRS® storytelling method. The primary conversion goal is class
registration; the primary audience is adult hobby learners, roughly 50+.

Pages in this bundle:

| File | Page |
| --- | --- |
| `Learn Spanish Fast Hoy.dc.html` | Homepage |
| `All Classes.dc.html` | Course hub, 5 levels, cart, book-buying steps |
| `About.dc.html` | Profe Linda's story |
| `Know Your Spanish Level.dc.html` | Self-placement checklist |

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes
showing intended look and behaviour, not production code to copy directly. Each
is a self-contained streaming HTML component: markup with inline styles, plus a
small JS class holding view state.

The task is to **recreate these designs in the target codebase's environment**
(React, Astro, WordPress, Squarespace, whatever the site moves to) using its
established patterns. If no environment exists yet, pick the most appropriate
one — the site is content-led with a small amount of interactivity, so a static
site generator with islands of JS is a good fit. Do not ship these HTML files
as the production site.

Note the current site runs on Weebly. Nothing in this design depends on Weebly,
and the old `wsite-*` markup should not be carried over.

## Fidelity
**High-fidelity.** Colors, typography, spacing and interaction states are final
and should be reproduced closely. Photography is the exception: every image is a
labelled striped placeholder that the client must fill with real photos.

## Design Tokens

### Colors
| Token | Hex | Use |
| --- | --- | --- |
| Page ground | `#F6EFE7` | Body background, warm plaster |
| Panel | `#FBF6F0` | Alternating sections, cards on ground |
| Ink | `#23191A` | Headlines, dark sections, hover states |
| Body text | `#4A3B37` | Paragraphs |
| Muted text | `#6B5852` | Labels, captions, meta |
| Secondary text | `#5C4A46` | Nav links |
| Border | `#E2D3C4` | Hairlines, card borders |
| Border (placeholder) | `#DCC8B8` | Image placeholder frames |
| Accent | `#8C2F39` | Terracotta crimson: CTAs, labels, emphasis |
| Accent pale | `#F0D3D7` | Pink surfaces (Linda's pink) |
| Accent pale on dark | `#E9BEC3` | Labels on ink sections |
| Accent tint | `#F6DCDE` | Body copy inside accent sections |
| Ink on accent | `#FFF6F2` | Text/buttons on accent and ink grounds |
| Text on dark | `#C9B8AF` / `#E8DBD2` / `#FBF6F0` | Footer, dark-section body, dark headings |
| Placeholder fill | `#EFE4D8` | Image placeholder ground |
| Neutral hover | `#EDE3DA` | Light button hover |

Accent-derived values used inside pink panels: `#7A2A32` (label), `#4A2226`
(body), `#2B1114` (heading), `#5A2A30` (caption).

Placeholder hatching: `repeating-linear-gradient(135deg, rgba(140,47,57,0.07) 0
2px, transparent 2px 11px)` over `#EFE4D8`.

Hover rule: **all hover states resolve to ink `#23191A`** (or `#FFF6F2` on dark
grounds) rather than a darker accent, so the accent color can be changed
globally without touching hover states.

### Typography
One family: **Bricolage Grotesque** (Google Fonts, variable, weights 300–700),
fallback `'Helvetica Neue', Helvetica, sans-serif`. Deliberately no monospace
and no serif — an earlier draft used both and read as generic.

| Role | Size | Weight | Letter-spacing | Line-height |
| --- | --- | --- | --- | --- |
| Page h1 | `clamp(38px, 5.6vw, 80px)` | 500 | `-0.05em` | 0.98 |
| Section h2 | `clamp(28px, 4.2vw, 52px)` | 500 | `-0.05em` | 1.0–1.06 |
| Card h3 | 21–27px | 500 | `-0.035em` | 1.02 |
| Lead paragraph | `clamp(17px, 1.5vw, 21px)` | 300 | normal | 1.55 |
| Body | 16–17px | 300 | normal | 1.6–1.7 |
| Pull quote | 20–26px | 400 | `-0.03em` | 1.32–1.5 |
| Label / eyebrow | 13–14px | 400 | normal | 1.8 |
| Stat figure | 28–32px | 500 | `-0.04em` | 1 |

Rules: sentence case everywhere — **no uppercase text-transform and no letter-
spaced small caps** anywhere in the design. Minimum rendered font size is 13px
because of the 50+ audience. Body copy is weight 300; headings 500; only the
logo and footer wordmark use 600.

Copy has **no em dashes** — a client requirement. Use commas, colons or full
stops. Interpuncts (`·`) are used as separators in labels.

### Spacing, radius, shadow
- Section padding: `clamp(44px, 7vw, 110px)` block, `clamp(20px, 5vw, 64px)` inline.
- Content max-width: `1180px`; prose columns `760–880px`.
- Grid gaps: 14px (tiles), 16–20px (cards), `clamp(24px, 5vw, 72px)` (major columns).
- Radius: `999px` on buttons and pills; `4px` on the offset pink panel behind
  hero images; **0 on cards and sections** — flat rectangles are part of the look.
- Only shadow in the design: nav flyout, `0 18px 40px rgba(35,25,26,0.1)`.
- Hero entrance animation: `@keyframes` translateY(10px)→0 with opacity 0→1, 700ms ease.

## Assets
No real assets are included. Every image is a striped placeholder with a
monospace-free caption naming what belongs there: Profe Linda mid-story, her
portrait, novel covers per level, Zoom class shots, reading circles, student
meet-ups, class novels on a table. The client's existing photos live under
`/uploads/1/1/1/8/11186754/` on the current Weebly site; the logo is
`logo-rev-071817_1.png`. Fonts load from Google Fonts.

## Files
`Learn Spanish Fast Hoy.dc.html`, `All Classes.dc.html`, `About.dc.html`,
`Know Your Spanish Level.dc.html` — all in this folder. See `SCREENS.md` for a
per-page breakdown and `BEHAVIOR.md` for interactions, state and open questions.
