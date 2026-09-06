# Joe Town marketing site

Dependency-free static website for the native Mac game. The September 4, 2026 redesign uses a forest-green and parchment field guide, real game captures, and restrained interactive illustrations.

## Develop and validate

```sh
python3 -m http.server 8137
python3 scripts/validate_site.py
```

The validator checks assets, image dimensions and alt text, IDs, privacy/release wording, the single GA4 installation, and JavaScript syntax. GitHub Actions runs it on pull requests and main.

## Page and assets

- `index.html`: product story, day/night comparison, ten-age selector, citizens/world, labeled 1.7 preview, FAQ, purchase links, structured data.
- `css/style.css`: responsive field-guide system, privacy page, focus states, reduced motion.
- `js/main.js`: accessible tabs, navigation, pausable delivery motion, native screenshot dialog with zoom, App Store click measurement.
- `images/refresh/`: sixteen optimized captures, four exact game sprite icons, and a new social card.
- `docs/REFRESH_ASSET_PROVENANCE.json`: source commits, capture arguments, dimensions, and asset hashes.
- `DESIGN.md` and `design-qa.md`: current design contract and verification.

Public gameplay imagery comes from the exact version 1.6 build-29 source. The inspection image is explicitly labeled version 1.7 internal build 32, including in its enlarged view. Portrait illustrations retain existing assets. Raw capture inputs and design documents are excluded from Vercel.

## Blender hero

The September 5 hero is an original Blender miniature, explicitly labeled as a 3D illustration, with the authentic day/night game captures directly below it. The eight-second H.264 loop uses 192 frames at 24 fps and has separate desktop/mobile exports. The 70 KB transparent WebP poster renders immediately. Reduced motion, data saver, and no-JavaScript visits start static. Playback pauses offscreen, in hidden tabs, while navigation is open, or behind a screenshot dialog.

Editable source and the procedural build script are in `art/` and excluded from deployment. See `art/README.md` for reproduction and `docs/BLENDER_HERO_QA.md` for validation.

## Product truth

Verified US storefront on September 4, 2026: **1.6, $9.99 once, macOS 14+, Apple silicon**. Version 1.7 build 32 is internal TestFlight, not the public download. Do not advertise public Intel support without a newly verified public release. The game saves locally and has no gameplay tracking; this website uses GA4. The privacy page does not load analytics.

## Production

Canonical: https://gojoetown.com/ • GitHub: enzo-prism/joe-town-site • Vercel: joe-town-site.

Pushes to main automatically deploy to production through the existing Git integration. Do not manually deploy unless that integration fails. Verify the deployment is READY for the exact commit, then check the canonical domain and asset hashes. A push alone is not release confirmation.
