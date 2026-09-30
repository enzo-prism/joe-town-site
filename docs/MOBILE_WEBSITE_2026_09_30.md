# Mobile marketing website update — September 30, 2026

## Release scope

The marketing website introduces the upcoming iPhone and iPad edition through real mobile previews, clearer platform guidance, and coordinated decorative motion. It preserves the forest/parchment field guide, authentic Mac gameplay, original Blender hero, keyboard navigation, and screenshot enlargement.

This is a website release. It does not upload, submit, approve, or release an Apple binary. The mobile UI shown was implemented after submitted build 38 and is labeled as an in-development preview.

## Verified release facts

Read-only App Store Connect and independent public Apple-page readbacks on September 30 established:

| Product | Observed state | Website treatment |
| --- | --- | --- |
| Mac 1.7.1 (36) | `READY_FOR_SALE`; public US listing $9.99, macOS 14+, Apple silicon and Intel | Current Mac purchase action and accurate compatibility |
| iOS 1.8 (38) | `WAITING_FOR_REVIEW`; valid attached build; manual release | “Coming to iPhone and iPad”; no available mobile download offer |
| New mobile UX source | `241c27d0a26860e8e5f63fad00fc09ac113b5687`; not in build 38 | Explicit mobile preview labeling on page and enlarged captures |

Mobile requirements are iOS/iPadOS 17+, A12+, landscape iPhone play and portrait/landscape iPad play. Each device keeps a local town; automatic sync is unavailable. The current public Mac binary does not provide a mobile save-transfer path. Gameplay works offline; optional Game Center uses Apple services. The game has no ads, in-app purchases, or gameplay tracking. Website GA4 remains separately described.

The same App Store record permits one purchase across Mac, iPhone, and iPad when the mobile edition is released. This does not mean the mobile app is public today. Approval and manual release are separate events.

## Asset evidence

`docs/MOBILE_ASSET_PROVENANCE.json` records the three new phone/tablet WebP captures: source commit, native simulator method, synthetic town fixtures, original dimensions, file hashes, and release limitations. There is no crop or visual retouching. Device frames and gesture SVGs are editorial website presentation. Original Mac capture lineage and Blender artwork provenance remain in their existing manifests.

## Motion and fallback contract

The page motion preference coordinates the hero video, deliveries, and new decorative motion. Continuous effects pause outside the viewport, in hidden tabs, while navigation is open, and behind a modal screenshot. Reduced motion, data saver, and no JavaScript start static. Content is never gated behind an entrance animation. Native links, FAQ disclosures, and all age content stay usable without JavaScript.

## Completed validation before promotion

The checked mobile revision uses asset version `20260930-mobile-r1`:

- Source validation passes for 119 HTML references and 38 IDs, including mobile provenance hashes, structured data, fragment targets, image dimensions/alt text, qualified privacy/release wording, and singleton GA4. Node syntax and Git whitespace checks pass.
- Decorative SVG lint passes at 0.83 KB. The external-CSS warning is expected for animation owned by the website stylesheet.
- Independent responsive checks at 320/375/390/430/768/1440 pixels and 844×390 landscape found no page-level horizontal overflow. Navigation, day/night, and FAQ targets are at least 44 pixels high.
- Native screenshot dialog, keyboard zoom, focusable image region, 40-pixel ArrowRight scrolling, Escape opener-focus restoration, and background scroll lock were verified.
- No-JavaScript navigation, FAQ, all ten ages, and original screenshot links remain usable.
- Reduced motion produces zero active animations and disables motion controls. Data-saver first load stays static with no video source; explicit resume activates visible scenes only. Missing IntersectionObserver gives a static fallback.
- Continuous animation pauses offscreen, in hidden tabs, under expanded navigation, and behind the screenshot dialog.
- Independent axe WCAG 2 A/AA checks found zero violations, with clear browser error/console checks. Four gradient and overlay checks measured 11.21:1, 11.61:1, 9.00:1, and 8.64:1, all above 4.5:1; the measurements are recorded in `docs/verification/mobile-website-20260930/contrast-check.json`. This is observed browser evidence, not exhaustive accessibility or physical-device certification.
- All 41 dynamically or locally referenced assets returned HTTP 200 and matched source hashes on the local server.
- Source checks confirm 24 buildings, 18 civilization technology choices, and 15 guild choices in both public Mac build 36 and current source. A repeated Apple readback immediately before push still reported iOS awaiting review with manual release.

Runtime evidence is in `docs/verification/mobile-website-20260930/motion-runtime.md`; product facts and count evidence are in `docs/MOBILE_RELEASE_FACTS.json` and `docs/MOBILE_SOURCE_COUNTS.json`. Historical September 4 and Blender checks remain separately recorded in `design-qa.md` and `docs/BLENDER_HERO_QA.md`.

## Production receipt

Implementation commit `18baa9a9c579b39418e815276ad67cddeff349ed` was atomically pushed to main and the newly created prod source mirror.

| Receipt | Observed result |
| --- | --- |
| Vercel deployment | `dpl_CdhQRGcv6MWG6k2xngqSYHrLeADG`; READY; production target; existing project/main integration |
| Deployment URL | `joe-town-site-n2kbott3a-enzo-design-prisms-projects.vercel.app` |
| Canonical domain | https://gojoetown.com/ resolves to the deployment above |
| GitHub deployment | `6768482682`; success for exact source SHA `18baa9a9c579b39418e815276ad67cddeff349ed` |
| Hosted CI | Run `36767260261`; completed successfully; actual validation job ran with Node 22 and Python |
| Canonical files | All 41 checked assets returned HTTP 200 and matched source bytes/hashes |

The canonical checks include HTML, CSS, JavaScript, privacy, social imagery, icons, crawler files, day/night captures, and locally hosted media. Portable machine-readable receipts are `docs/verification/mobile-website-20260930/production-assets.json` and `docs/verification/mobile-website-20260930/production-release.json`.

Independent production smoke checks passed at 390px phone and 1440px desktop:

- No page-level horizontal overflow; updated page title, mobile imagery, and full 2622-pixel screenshot source verified.
- Mobile navigation followed its anchor and closed correctly.
- Screenshot zoom focused the image region, ArrowRight scrolled 40 pixels, and Escape restored opener focus.
- The page motion control produced zero running and 11 paused animations.
- Reduced motion produced zero animations and a disabled motion control.
- Axe reported zero violations; browser error and console results were empty in normal and reduced-motion visits.

The independent report is `docs/verification/mobile-website-20260930/production-audit.md`. These are production browser checks, distinct from the broader pre-push matrix and canonical file/hash checks. A subsequent docs-only commit records the release receipts; the implementation deployment identity remains the source SHA above.

Production uses the existing Vercel project `joe-town-site`, with main as its configured production branch. The prod branch is a source mirror; Vercel production follows main. A successful push must be followed by exact-commit READY verification and canonical-domain asset/content and browser checks. Record hosted CI independently from local validation and deployment status.
