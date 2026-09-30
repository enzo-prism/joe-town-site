# Joe Town website QA history

## Mobile website update — September 30, 2026

Implementation adds a mobile preview chapter and coordinated motion, while refreshing current platform and release information. New native mobile captures are labeled as in-development UI from source `241c27d`, newer than submitted build 38. Mac 1.7.1 (36) is public; iOS 1.8 (38) remains awaiting review with manual release. The website must say “Coming to iPhone and iPad.”

### Completed September 30 checks

The current mobile revision uses asset version `20260930-mobile-r1`. Observed checks before promotion:

- Source validator passes: 119 HTML references, 38 IDs, image dimensions/alt text, source-provenance SHA checks, structured data, fragment guards, privacy/release wording, and the single GA4 installation. Node syntax and Git whitespace checks pass.
- Decorative SVG lint passes for the 0.83 KB illustration; the external-CSS warning is expected because website CSS owns its animation.
- Independent browser layouts at 320, 375, 390, 430, 768, and 1440 pixels, plus 844×390 landscape, have no page-level horizontal overflow. Navigation, day/night, and FAQ controls have touch targets at least 44 pixels high.
- Screenshot enlargement uses native dialog. Keyboard zoom exposes a focusable image region; ArrowRight scrolls it by 40 pixels. Escape closes the dialog and restores opener focus. Background scroll lock works.
- Without JavaScript, all ten ages, navigation, FAQ, and original screenshot links work. No content is hidden behind animation.
- Reduced motion yields zero active animations and disables the motion controls; CSS stillness and runtime preference behavior were checked.
- Data-saver first load stays static and does not assign a video source. Explicit resume animates only visible scenes. The no-IntersectionObserver fallback stays static.
- Offscreen, hidden-tab, expanded-menu, and screenshot-dialog states pause continuous motion.
- Independent axe WCAG 2 A/AA checks reported zero violations; browser error and console checks were clear. Gradient/overlay contrast received manual review. These checks are not exhaustive device or accessibility certification.
- All 41 dynamically or locally referenced assets returned HTTP 200 from the local server and matched their source hashes.
- Public Mac build-36 and current-source counts agree: 24 buildings, 18 civilization technology choices, and 15 guild choices. The final pre-push Apple readback still reported iOS `WAITING_FOR_REVIEW` with manual release.

Runtime evidence is recorded in `docs/verification/mobile-website-20260930/motion-runtime.md`. Detailed release facts, provenance, and source counts are in the corresponding mobile JSON manifests. Earlier checks below remain historical receipts. The September 30 production deployment and canonical-domain verification are **pending** until the exact pushed revision is observed live. The detailed release record is `docs/MOBILE_WEBSITE_2026_09_30.md`.

## Historical field-guide redesign — September 4, 2026

### Analysis and implementation

The earlier page obscured gameplay behind hero text and repeated similar screenshot galleries. Replaced that presentation with a forest/parchment field guide, separate bright gameplay frame, concrete supply-chain illustration, ten-age explorer, varied citizen/world sections, and clear purchase information. Added 16 fresh captures, four exact sprite icons, and a 1200×630 social card. All capture lineage is recorded in docs/REFRESH_ASSET_PROVENANCE.json.

Public 1.6 build-29 imagery is separated from the explicitly labeled internal 1.7 build-32 inspection preview. US price, macOS requirement, Apple silicon support, and source counts were verified. Existing analytics and privacy distinctions remain intact.

### Completed checks

- Static validator, JavaScript syntax, and git whitespace checks pass.
- Browser layouts at 320, 390, 430, 768, and 1440 pixels have no page-level horizontal overflow.
- All referenced images load; no JavaScript runtime errors observed.
- With enhancement JavaScript blocked, all ten ages remain visible, ordinary screenshot links work, and unavailable controls remain hidden; the resource illustration stays still.
- Day/night selection changes the displayed image and pressed state.
- Age tab End selects Space; native keyboard focus and single visible panel verified.
- Mobile navigation opens, Escape closes and restores focus, and desktop resize resets it.
- Preview dialog identifies 1.7, supports zoom and Escape, and restores its opener.
- Delivery pause works; reduced motion disables animation and marks the control accordingly.
- Homepage axe WCAG A/AA scan: zero violations. Image overlay contrast needs manual inspection; independently reviewed labels are readable.
- Privacy page: zero axe violations, no analytics script, no horizontal overflow.
- A separate reviewer independently checked desktop, 320px mobile, keyboard tabs, preview dialog, and menu resize; no actionable issues.

These are browser and source checks, not a claim of exhaustive device certification. Production release must be verified against its exact Git commit and canonical-domain assets after main is pushed.

### Initial production receipt

Implementation commit `085a3cc17f8ba33e971d4bf7f9b69e04be93fc71` was pushed to main. Its Git-triggered Vercel deployment `joe-town-site-rimwjrkgk-enzo-design-prisms-projects.vercel.app` reached READY for production, and the canonical site rendered the new design. The follow-up records this receipt and refreshes the sitemap modification date.
