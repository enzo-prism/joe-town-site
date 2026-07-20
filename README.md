# Joe Town — Marketing Site

Static marketing site for **Joe Town**, a premium macOS strategy game.
Dark, gilded, alive — no build step, no dependencies, no tracking.

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
- `css/style.css` — full design system (cavern palette, Fraunces/Inter/JetBrains Mono/Press Start 2P)
- `js/main.js` — vanilla JS (<15KB): crystal particle field, scroll reveals,
  ten-age tab switcher (WAI-ARIA, arrow keys), hero tilt-on-scroll, mobile menu
- `images/` — derived web assets (WebP + PNG favicons + `og.png`)
- `images/raw/` — original Retina captures, kept out of the deployed markup

## Notes

- All motion respects `prefers-reduced-motion`.
- Hero is preloaded; the age-switcher preloads its ten frames on load
  so tab swaps are instant.
- Copy and palette follow `DESIGN.md`.
