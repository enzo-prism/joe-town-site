# Field-guide redesign QA — September 4, 2026

## Analysis and implementation

The earlier page obscured gameplay behind hero text and repeated similar screenshot galleries. Replaced that presentation with a forest/parchment field guide, separate bright gameplay frame, concrete supply-chain illustration, ten-age explorer, varied citizen/world sections, and clear purchase information. Added 16 fresh captures, four exact sprite icons, and a 1200×630 social card. All capture lineage is recorded in docs/REFRESH_ASSET_PROVENANCE.json.

Public 1.6 build-29 imagery is separated from the explicitly labeled internal 1.7 build-32 inspection preview. US price, macOS requirement, Apple silicon support, and source counts were verified. Existing analytics and privacy distinctions remain intact.

## Completed checks

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
