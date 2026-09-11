# Screens

Shared across all four pages.

## Header (all pages)
Flex row, space-between, wrapping, `padding: 22px clamp(20px,5vw,64px)`,
`border-bottom: 1px solid #E2D3C4`, `position: relative; z-index: 30`.

- **Logo block**: stacked links. Wordmark "Learn Spanish Fast" 23px/600/`-0.035em`
  in ink; under it "hoy · con Profe Linda" 13px in accent, `margin-top: 7px`.
- **Nav**: 15px links in `#5C4A46`, gap `clamp(14px,2.4vw,28px)`, hover → ink.
  Current page's link is accent + weight 500.
- **Courses flyout**: nav item wrapped in `position: relative` with
  `onMouseEnter` / `onMouseLeave` setting `menuOpen`. Panel is
  `position: absolute; top: calc(100% + 14px); left: -16px; min-width: 250px`,
  background `#FBF6F0`, 1px border `#E2D3C4`, 8px padding, `display: grid; gap: 1px`,
  shadow `0 18px 40px rgba(35,25,26,0.1)`. Items 11px/14px padding, 15px text,
  hover background `#F0D3D7`. Homepage panel leads with a bold "All classes" row,
  then the five level names.
  **Accessibility gap to fix in implementation**: hover-only. Add keyboard focus
  and click/tap open, plus `aria-expanded`, and close on Escape and outside click.
- **Register button**: accent pill, `#FFF6F2` text, `padding: 12px 20px`,
  `border-radius: 999px`, hover background ink. Currently `mailto:`.

## Footer (all pages)
Ink `#23191A` ground, `#C9B8AF` text, `padding: clamp(36px,5vw,60px) clamp(20px,5vw,64px)`.
Grid `repeat(auto-fit, minmax(220px,1fr))`, gap 28px: wordmark + location line,
two link columns (15px), and a 13px copyright line. All footer text is `#C9B8AF`
or lighter for contrast against the ink ground — do not darken it.

---

## 1. Homepage — `Learn Spanish Fast Hoy.dc.html`
Purpose: convince an adult beginner that this is not a grammar class, then send
them to a level.

Sections in order:

1. **Hero** (`#top`) — gradient `#FBF6F0`→`#F6EFE7`, plus a dot grid overlay
   (`radial-gradient(#E0CFC0 1px, transparent 1px)`, `background-size: 22px 22px`,
   opacity 0.5, `pointer-events: none`). Two-column
   `repeat(auto-fit, minmax(320px,1fr))`, gap `clamp(32px,5vw,72px)`.
   Left: eyebrow "TPRS® method · live on Zoom · small groups"; h1 "Learn to
   *speak* Spanish, not to study it." with "speak" in accent; lead paragraph;
   two pills (accent "Find your level", outlined "What is TPRS?"); three stats
   above a hairline (25 yrs / 4 levels / 100%).
   Right: 4:5 image placeholder with a pink `#F0D3D7` panel offset behind it
   (`left/top: -18px; right/bottom: 30px`).
   *Note: the stat still reads "4 levels" while the catalogue now has five — fix.*
2. **Courses** (`#courses`) — panel ground, hairline top and bottom. Header row:
   eyebrow, h2 "Start where you actually are, not where a textbook says you
   should be.", and a right-aligned meta paragraph about the weekly 90-minute
   Zoom class. Grid `repeat(auto-fit, minmax(240px,1fr))`, gap 20px, five cards:
   level tag, name, 3:2 novel placeholder, blurb, and a "Course description →"
   link on a hairline top border, going to All Classes. Card hover: border → ink.
3. **Meet Linda** (`#profe`) — two columns. Left: 1:1 portrait placeholder and a
   pink `#F0D3D7` caption panel (26px/24px padding) with her credentials.
   Right: eyebrow "Conoce a tu profe", h2, three paragraphs, then a pull quote
   with a 2px accent left border, 24px padding-left.
4. **Method** (`#method`) — **ink section**. Eyebrow in `#E9BEC3`, h2
   "Teaching Proficiency through Reading & Storytelling" in `#FBF6F0`, two
   columns: prose (`#E8DBD2`, then `#C9B8AF`) with an inline link to
   tprsbooks.com styled `#F0D3D7` with a translucent underline, and a Krashen
   quote in a translucent pink card; right column is four numbered pillars
   separated by `rgba(246,239,231,0.16)` hairlines.
5. **Testimonials** (`#voices`) — panel ground, three quote cards on `#F6EFE7`
   with 1px borders; attribution in accent above a hairline.
6. **"This is for you if…"** — two columns: heading block and a six-item list.
   Each row: 7px accent dot (`transform: translateY(-3px)`), text 16–18px/300,
   hairline bottom.
7. **Photo strip** — h2 "La clase, en fotos", meta line right-aligned, then
   `repeat(auto-fit, minmax(200px,1fr))` square placeholders, gap 14px.
8. **FAQ** (`#faq`) — panel ground, 880px column. Six accordion rows; see BEHAVIOR.
9. **Register** (`#register`) — accent ground, centred, max-width 760px.
   Eyebrow in `#F0D3D7`, h2 "Empieza hoy." at `clamp(36px,5.2vw,64px)`,
   lead in `#F6DCDE`, two pills: solid `#FFF6F2` and an outlined one
   (`rgba(255,246,242,0.45)` border, hover fills `rgba(255,246,242,0.1)`).

## 2. All Classes — `All Classes.dc.html`
Purpose: pick a level, see price and dates, get the books.

1. **Hero** — gradient ground, 1180px. Eyebrow "All classes · online via Zoom",
   h1 "Five levels. One weekly class. No textbook.", lead ending on "Choose the
   level at which you can *speak*", two pills ("Not sure? Find your level" →
   placement page; "Books & audiobook steps" → `#books`).
2. **Course rows** — five `<article>` cards, panel ground, 1px border,
   `padding: clamp(22px,3vw,34px)`, grid `repeat(auto-fit, minmax(320px,1fr))`,
   gap `clamp(24px,3vw,40px)`, `align-items: start`. Three tracks:
   - **Description**: step label (accent 13px), h2 `clamp(27px,3.2vw,38px)`,
     blurb, then "You are ready for this level if:" (14px `#6B5852`) and a
     15px readiness line.
   - **Novel**: 3:2 placeholder captioned with the book title.
   - **Details**: five label/value rows with hairline separators — Price (24px/500),
     Meets, Term, Novel, Homework — then a full-width accent "Add to cart" button
     and a centred "Ask Profe Linda about this class" mailto link.
3. **Cart** — **ink section**. Left: eyebrow "In your cart", h2 that reads
   "Your cart is empty" or "Total $N for N classes", explanatory paragraph, and a
   pink `#F0D3D7` "Checkout by email" pill. Right: one row per cart item with
   name, price and an outlined pill "Remove" button.
4. **Books** (`#books`) — panel ground. Eyebrow "Before the first class", h2
   "Two things to buy, and one thing not to do", three numbered cards on `#F6EFE7`
   (big accent numeral 30px/500, title 21px, body), then a 15px `#6B5852` note
   about the $250,000 copyright fine on printed ebooks.

## 3. About — `About.dc.html`
1. **Hero** — two columns: eyebrow "Conoce a tu profe", h1 "Linda Ward",
   lead, three facts above a hairline (25 yrs / Spain / TPRS®); right, 4:5
   portrait placeholder with the offset pink panel.
2. **Story** — panel ground, 780px column, h2 "Why Spanish, of all the
   languages?", five paragraphs of her own copy, then the "pitched it overboard"
   pull quote at `clamp(20px,2.2vw,26px)`.
3. **How she teaches** — four belief cards, each with a **2px accent top border**
   and 20px padding-top, grid `repeat(auto-fit, minmax(250px,1fr))`, gap 18px.
4. **Photo strip** — "En la clase", four square placeholders.
5. **CTA** — accent ground, centred, h2 "Vamos a hablar.", two pills to All
   Classes and the placement page.

## 4. Know Your Spanish Level — `Know Your Spanish Level.dc.html`
Purpose: self-placement without a test.

1. **Hero** — 760px column. Eyebrow "Placement, the honest way", h1 "Know your
   Spanish level", lead telling the reader to tick what they can do *out loud*.
2. **Checklist** — six full-width rows on a hairline grid. Each row is a button:
   26px circular indicator (1px `#C9B0A0` border; fills accent with a `✓` in
   `#FFF6F2` when picked), then a 17–20px/500 statement and a 15px/300 example
   in `#6B5852`. Row hover background `#FBF6F0`.
3. **Result panel** — pink `#F0D3D7`, `padding: clamp(26px,4vw,40px)`. Kicker
   ("Tick the statements above" or "Ticked N of 6 · suggested class"), the
   recommended level as h2 in `#2B1114`, a paragraph in `#4A2226`, an accent
   pill to All Classes and an outlined "Start again" button.
4. **Ladder** — panel ground. "The five levels" / "What each class expects of you
   on day one", then five rows: number + name in one column, expectation
   paragraph spanning two, hairline between rows.
