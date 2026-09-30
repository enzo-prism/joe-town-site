# Joe Town mobile website preview acceptance

Target: http://localhost:8149/ · Date:2026-09-30 · Independent rendered-browser audit

**Result: No unresolved product issue found in the tested journeys.** One keyboard gallery issue was identified, fixed by the runtime worker, and independently retested.

## Final responsive matrix

320×740,375×812,390×844,430×932,768×1024,1440×900 and844×390. After network idle, all seven had document width equal to viewport width, no heading overflow, JavaScript initialized and the real iPhone road image loaded at2622px source width. See final-matrix.json and screenshots/final-mobile-*.png. Pixel review covered320,390,768,1440 andlandscape844 views.

## Interaction and motion verification

- Mobile navigation opened, exposed Mobile/The game/Ten ages/Questions and closed after Questions selection. Navigation links44px high; FAQ summary hit areas52px high; header CTA/menu44px high; Day/Night controls44px high. The logo is smaller but is an isolated secondary home link.
- Native FAQ accordion opened. Updated availability FAQ describes coming soon, matching the verified public-release boundary provided by parent.
- Coming-to-mobile badge and Explore mobile preview navigate to the new chapter. Real device captures remain labelled development previews. The verified Mac App Store CTA destination is preserved.
- Pause visual effects changed to Resume visual effects and paused all11 mobile CSS animations observed; shared hero and delivery motion controls displayed Visual effects paused and were disabled. Runtime worker independently covers resume/state policies.
- Reduced-motion emulation matched=true, document.getAnimations() returned[], mobile and delivery controls displayed disabled Reduced motion on. No hidden copy or image loss observed.
- Phone road capture opened in native dialog. Zoom in enlarged it; fixed version focused a labelled region withtabIndex0. ArrowRight moved scrollLeft0→40px. Escape closed the dialog and returned focus to the screenshot link.
- JavaScript file requests were intentionally aborted in isolated jt-site-audit-nojs session. Root stayed without js class. Mobile copy and real device captures remained visible, motion control was hidden, navigation links and all10 age anchors remained available. Native FAQ opened, and the screenshot link navigated to the full-resolution WebP. This is a JavaScript-file-unavailable fallback test, not a browser-wide JavaScript-disabled claim.
- Final axe4.12.1 WCAG2A/AA:0 violations,1 incomplete contrast rule (manual checks needed on image-caption/arrow content). Final browser errors[] and console[].

## Resolved issue — Keyboard zoom panning

Before: Zoom left focus on its button; the scroll viewport hadtabIndex-1. ArrowRight did not pan the2622px-wide image within the365px viewport, and Tab did not reach it. Independent source reviewer flagged the same concern.

After: Explicit labelled focusable region; Zoom focuses it. ArrowRight pans40px, Escape restores opener focus. Evidence: screenshots/keyboard-zoom-fixed390.png. No unresolved regression.

## Evidence caveats

- An early320 screenshot was taken while assets were still changing/loading and showed a missing road image. The final network-idle rerun loaded the same image normally; first capture is retained as intermediate evidence, not counted as a final failure.
- Agent-browser video encoding stalled, its stop/close returned busy errors, and doctor found no installation failure. Parent authorized static proofs; screenshots and observed browser geometry establish the fix. The owned encoder was interrupted for cleanup; no other sessions were touched.
- These are Chromium viewport tests, not physical Safari/VoiceOver/device-performance acceptance. Parent independently verifies release facts, source/config, deployment and production.
