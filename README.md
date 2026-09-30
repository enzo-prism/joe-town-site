# Joe Town marketing site

Dependency-free static website for Joe Town. The forest-green and parchment field guide combines real gameplay captures, an original animated Blender town, and a clearly labeled preview of the upcoming iPhone and iPad edition.

## Develop and validate

```sh
python3 -m http.server 8137
python3 scripts/validate_site.py
node --check js/main.js
git diff --check
```

The validator checks assets, image dimensions and alt text, IDs, privacy/release wording, the single GA4 installation, and JavaScript syntax. GitHub Actions runs it on pull requests and main. Also run browser checks for responsive layout, keyboard interaction, motion controls, reduced motion, data saver, and the no-JavaScript fallback. September 30 checks are recorded in `design-qa.md`; production receipts remain separate from local validation.

## Page and assets

- `index.html`: platform and release status, mobile preview, day/night comparison, supply chain, ten-age selector, citizens/world, FAQ, Mac purchase links, and structured data.
- `css/style.css`: responsive field-guide system, device frames, decorative motion, privacy page, focus states, and reduced-motion fallback.
- `js/main.js`: accessible navigation and tabs, motion lifecycle, native screenshot dialog with zoom, and App Store click measurement.
- `images/refresh/`: sixteen original optimized captures and four exact game sprite icons.
- `images/mobile/`: three real native mobile captures, preserved at their original aspect ratios.
- `docs/REFRESH_ASSET_PROVENANCE.json`: original Mac capture commits, arguments, dimensions, and hashes.
- `docs/MOBILE_ASSET_PROVENANCE.json`: mobile source commit, capture method, dimensions, hashes, and explicit release limitations.
- `docs/MOBILE_RELEASE_FACTS.json` and `docs/MOBILE_SOURCE_COUNTS.json`: independently checked release facts and public/current-source counts.
- `docs/verification/mobile-website-20260930/motion-runtime.md`: observed motion and fallback behavior.
- `DESIGN.md`, `design-qa.md`, and `docs/MOBILE_WEBSITE_2026_09_30.md`: current design contract, validation history, and mobile website release record.

Original Mac imagery comes from version 1.6 build-29 source and deterministic marketing fixtures. It remains authentic historical gameplay evidence, rather than a claim that every capture shows the latest binary. The mobile images come from native simulator rendering of synthetic town fixtures at source commit `241c27d0a26860e8e5f63fad00fc09ac113b5687`. They are labeled as an in-development mobile preview. That source is newer than the submitted iOS build 38 and is not included in it. Screenshots have not been visually retouched or cropped. Editorial device frames and gesture illustrations are website presentation, not game UI.

## Motion and Blender hero

The original Blender miniature is explicitly labeled as a 3D illustration. Its eight-second H.264 loop uses 192 frames at 24 fps, with separate desktop/mobile exports and an immediate 70 KB transparent WebP poster. Authentic gameplay remains separately identifiable. Keep the editable source in `art/`, which is excluded from deployment; see `art/README.md` and `docs/BLENDER_HERO_QA.md`.

The mobile chapter adds decorative gesture and device motion. Every continuous animation must obey the page motion control and pause offscreen, in hidden tabs, while navigation is open, or behind the screenshot dialog. Reduced motion, data saver, and no-JavaScript visits start static. Content stays readable without animation or enhancement JavaScript. See `DESIGN.md` for the interaction contract and `design-qa.md` for observed checks.

## Product truth — September 30, 2026

Live App Store Connect and the US public Apple listing were checked independently:

- **Mac 1.7.1 (36) is public:** $9.99 once in the US, macOS 14 or later, Apple silicon and Intel. Other regional prices vary.
- **iPhone and iPad 1.8 (38) is awaiting review:** `WAITING_FOR_REVIEW`, with manual release selected. Approval does not itself make the mobile edition public. Use “Coming to iPhone and iPad” until release and an independent public-listing readback confirm availability.
- Mobile requirements are iOS/iPadOS 17 or later and A12 or later. iPhone play is landscape; iPad supports portrait and landscape.
- When released, the mobile edition is part of the same App Store purchase. Do not imply it is downloadable today.
- Gameplay works offline, with no ads, in-app purchases, or gameplay tracking. Optional Game Center uses Apple services. Each device keeps its own town locally; there is no automatic town sync. Do not promise current Mac/mobile save transfer.

The website uses GA4 for aggregate visits and App Store clicks. The game and website privacy statements are distinct; the privacy page does not load analytics. No Apple binary was uploaded or released by this website update.

## Production

Canonical: https://gojoetown.com/ • GitHub: enzo-prism/joe-town-site • Vercel: joe-town-site.

The existing Vercel Git integration deploys **main** to production. A `prod` branch, when present, mirrors the released source; it does not change the configured Vercel production branch. Do not manually deploy unless the existing integration fails. Never create a replacement Vercel project for routine release work.

Before promotion, recheck mobile release state and the public Apple listing. After pushing, verify the deployment is READY for the exact main commit, then verify canonical HTML, CSS, JavaScript, social image, favicons, privacy, crawler files, referenced media hashes, and rendered desktop/mobile interactions. A Git push alone is not release confirmation. Record deployment receipts separately from local checks and hosted CI outcomes.
