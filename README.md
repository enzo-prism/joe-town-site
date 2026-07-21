# Joe Town — Marketing Site

Static marketing site for **Joe Town**, a premium macOS strategy game.
The selected **Living Diorama** direction puts authentic gameplay in every major
chapter, supported by the monochrome Founding Tile and warm editorial type — no
build step, no dependencies, no tracking.

## Run locally

From this folder:

```sh
python3 -m http.server 8123
```

Then open <http://localhost:8123>.

Any static file server works (`npx serve`, etc.). Use a local server when
checking root-relative favicons, `robots.txt`, and `sitemap.xml`.

## Structure

- `index.html` — single-page product site, SEO/OG/JSON-LD inline
- `css/style.css` — full Founding Tile design system (ink/bone palette, Plus Jakarta Sans across every type surface)
- `js/main.js` — vanilla JS: resilient scroll reveals, accessible mobile menu,
  swipe-rail controls, scroll progress, compact FAQ behavior, and a
  context-aware mobile purchase bar
- `images/` — the Founding Tile SVG master, derived PNG icons/favicons, WebP captures, and `og.png`
- `favicon.ico`, `robots.txt`, `sitemap.xml` — crawler and legacy browser fallbacks
- `images/raw/` — original Retina captures, kept out of the deployed markup
- `design-qa.md` — visual comparison history, interaction checks, and the final
  Product Design QA result

## Notes

- All motion respects `prefers-reduced-motion`.
- Mobile keeps the purchase action in the first viewport, turns the visual
  civilization journey into swipe rails, isolates modal navigation, and
  respects safe areas.
- The gameplay-led hero is preloaded. All below-fold images lazy-load with
  explicit dimensions.
- Copy and palette follow `DESIGN.md`.

## Release state

- Production follows the selected Living Diorama redesign, verified Joe Town 1.1
  product facts, and the mobile swipe-rail UX pass.
- Responsive QA targets are `320`, `390`, `430`, `768`, and `1440` CSS pixels.
  Source and interaction checks are complete; the latest device capture is tracked
  transparently in `design-qa.md` as a post-release follow-up.
- Direction 1, **The Living Diorama**, is selected and implemented. See
  [`docs/VISUAL-FIRST-REDESIGN.md`](docs/VISUAL-FIRST-REDESIGN.md) for the
  decision record and archived alternatives.

## Production

- Canonical site: <https://gojoetown.com/>
- Production branch: `main`
- Hosting: Vercel project `joe-town-site`
- GitHub-connected updates to `main` deploy automatically. Do not also run a
  manual production deploy unless the Git deployment fails.
- Verify the released title, HTML hash, JavaScript, CSS, social image, favicons,
  `robots.txt`, and `sitemap.xml` on the canonical domain after every release.
