# Interactions, state and open questions

## State per page

### Homepage
| State | Type | Purpose |
| --- | --- | --- |
| `open` | number | Index of the expanded FAQ row; `0` on load, `-1` when all closed |
| `menuOpen` | boolean | Courses flyout visibility |

### All Classes
| State | Type | Purpose |
| --- | --- | --- |
| `menuOpen` | boolean | Courses flyout |
| `cart` | array of `{ name, price, amount }` | Selected classes |

### About
| `menuOpen` | boolean | Courses flyout |

### Know Your Spanish Level
| State | Type | Purpose |
| --- | --- | --- |
| `menuOpen` | boolean | Courses flyout |
| `picked` | array of indices | Which of the six statements are ticked |

No data fetching anywhere. No persistence — cart and checklist reset on reload,
which is acceptable for the prototype but see "Open questions".

## Behaviours

**FAQ accordion (homepage).** One row open at a time. Clicking the open row
closes it (`open` → `-1`). The sign glyph flips `+` → `−` (U+2212). Answer body
is conditionally rendered, `padding: 0 40px 30px 4px`, max-width 42em. Implement
with `<details>`/`<summary>` or a button with `aria-expanded` and a labelled
region; the prototype uses a plain button.

**Courses flyout.** Opens on `mouseenter` of the wrapper, closes on
`mouseleave`. No delay, no animation. Must gain keyboard and touch support in
implementation (see SCREENS header note).

**Add to cart (All Classes).** Clicking "Add to cart" appends
`{ name, price, amount }` if not already present; the button label becomes
"Added to cart" and further clicks are no-ops. Prices are parsed from the `$140`
strings via `parseInt` — in production, hold numeric amounts and format for
display, not the reverse. Cart heading recomputes the total and pluralises
class/classes. "Remove" drops by index.

**Checkout.** Deliberately not implemented: "Checkout by email" is a `mailto:`
and the copy explains Linda replies with the payment link, curriculum and Zoom
code. The intended next step is Stripe Payment Links / Buy Buttons per class,
with the $5 audiobook subscription as a second link or an upsell at checkout —
hosted by Stripe, embedded rather than a bare redirect, so there is no PCI
surface and no server to maintain.

**Placement checklist.** Ticks are independent; the score is simply the count of
ticked statements, and the recommendation is a lookup on `min(score, 6)`:

| Ticked | Recommendation |
| --- | --- |
| 0–1 | Beginning I |
| 2 | Beginning II |
| 3 | Intermediate Fall |
| 4 | Intermediate Spring |
| 5–6 | Intermediate-Advanced |

The statements are ordered by difficulty, so this is a proxy for "highest thing
you can do". A stricter implementation would use the index of the highest ticked
statement rather than the count — worth discussing with Linda.

**Accent theming.** All four pages hard-code the accent literals inline so the
page paints instantly; a small routine then walks every element with a `style`
attribute on mount and update, caches the original in `data-accent-base`, and
substitutes the accent family (accent, three pale tints, three shaded variants,
plus the `rgba(140,47,57,0.07)` placeholder hatch) derived from one input color
by mixing toward white or black. This exists so the client can preview a
different pink; **in production, drop the DOM walk and use CSS custom properties**
on `:root` (`--accent`, `--accent-pale`, `--accent-ink`, …) with `color-mix()`.

**Responsive behaviour.** Everything is fluid: `clamp()` for type and padding,
`repeat(auto-fit, minmax(Xpx, 1fr))` for every grid, `flex-wrap` on all button
and nav rows. There are no media queries and no fixed widths. The nav wraps to a
second line on narrow screens rather than collapsing into a hamburger — a real
mobile menu is still to be designed.

**Animation.** Only the hero entrance (700ms ease, opacity + 10px rise) and the
color transitions implied by hover states. Nothing scroll-triggered.

## Content provenance
Copy was rebuilt from the client's live site: the pasted homepage source plus the
Beginning I, Beginning II, Intermediate, Advanced/Intermediate-Advanced, Class
Schedule and store pages on learnspanishfasthoy.com. Testimonials (JR, Justin,
Meg) and Linda's biography are her words, lightly tidied. Tone brief: keep the
warmth, drop the all-caps enthusiasm.

Cut from the original by client request: the Intensive Spanish Summer Institute
(ISSI) section and its links.

## Open questions for the client
1. **Schedule and prices are stale.** `$140`, the meeting days/times and the term
   dates come from older store pages; two novels read "Announced before term".
   All of it needs confirming before launch.
2. **Course levels.** The homepage stat still says "4 levels" while the catalogue
   lists five (Beginning I, Beginning II, Intermediate Fall, Intermediate Spring,
   Intermediate-Advanced). Fix the stat.
3. **Photography and logo.** Every image is a placeholder; the real photos and
   the logo need to come across from the Weebly uploads.
4. **Contact address.** `profe@learnspanishfasthoy.com` is assumed throughout.
5. **Pages not yet designed.** Individual course pages, Contact, Photos gallery,
   Class Schedule, Resources, cancellation and photo policies, blog.
6. **Cart persistence and a real checkout** — see "Checkout" above.
