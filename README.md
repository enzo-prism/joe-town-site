# Joe Town — Marketing Site

Static marketing site for **Joe Town**, a premium macOS strategy game.
Built around the monochrome Founding Tile, warm editorial type, and the game's living isometric world — no build step, no dependencies, no tracking.

## Run locally

From this folder:

```sh
python3 -m http.server 8123
```

Then open <http://localhost:8123>.

Any static file server works (`npx serve`, etc.). Opening `index.html`
directly from disk also works — everything is relative and self-contained
apart from Google Fonts.

## Structure

- `index.html` — single-page product site, SEO/OG/JSON-LD inline
- `css/style.css` — full Founding Tile design system (ink/bone palette, Fraunces/Inter/JetBrains Mono)
- `js/main.js` — vanilla JS (<15KB): scroll reveals, ten-age tab switcher
  (WAI-ARIA, arrow keys), subtle hero motion, accessible mobile menu,
  mobile flock disclosure, and a context-aware mobile purchase bar
- `images/` — the Founding Tile SVG master, derived PNG icons/favicons, WebP captures, and `og.png`
- `images/raw/` — original Retina captures, kept out of the deployed markup

## Notes

- All motion respects `prefers-reduced-motion`.
- Mobile uses shorter hero spacing, swipeable story rails, progressive disclosure,
  safe-area purchase controls, and modal menu isolation.
- Hero is preloaded; the age-switcher preloads its ten frames on load
  so tab swaps are instant.
- Copy and palette follow `DESIGN.md`.

## Release state

- The current production-ready release includes the Founding Tile identity,
  verified Joe Town 1.1 product facts and pricing, and the completed mobile UX pass.
- Responsive QA targets are `320`, `390`, `768`, and `1440` CSS pixels with no
  document-level horizontal overflow.
- The next visual-first redesign is intentionally **not selected or implemented**.
  See [`docs/VISUAL-FIRST-REDESIGN.md`](docs/VISUAL-FIRST-REDESIGN.md) for the
  three candidate directions and the approval gate.

## Production

- Canonical site: <https://gojoetown.com/>
- Production branch: `main`
- Hosting: Vercel project `joe-town-site`
- Deploy from a clean, verified `main` checkout with `vercel --prod` and verify
  the canonical domain after deployment.
