# Joe Town production smoke verification

Date:2026-09-30 · Target:https://gojoetown.com/ · Fresh isolated Chromium browser session jt-site-audit-prod

**Passed: no unresolved issue observed in live critical journeys.** Parent independently verifies Git, CI, deployment identity and asset hashes. UI commit provided by parent:18baa9a9c579b39418e815276ad67cddeff349ed.

- Live title reads Coming to iPhone & iPad; phone hero preserves the verified Mac CTA and presents the mobile preview action.
- Phone390×844 and desktop1440×900: document width matches viewport; js initialized. Desktop mobile chapter displays real device captures; phone road image source loaded at2622px wide.
- Mobile menu opens, Mobile link reaches the chapter and menu closes.
- Phone road lightbox opens. Zoom focuses the labelled region/tabindex0. ArrowRight moves scrollLeft40px. Escape closes and restores focus to the road-image link.
- Pause visual effects leaves0 mobile animations running and11 paused.
- Reduced motion: preference matches,0document animations, mobile motion button disabled and labelled Reduced motion on;390px layout remains without overflow.
- Axe4.12.1 WCAG2A/AA:0violations,1incomplete contrast rule requiring manual review of image-overlay/arrow content.
- Browser errors[] and console[] in both normal and reduced-motion runs.
- Six final screenshots and browser-observed JSON receipts preserved in this directory. Session closed successfully.

This smoke verifies the live deployed website in Chromium; it does not claim physical Safari/VoiceOver acceptance or public mobile App Store availability.
