# Joe Town — Visual-First Redesign Directions

Status: **Awaiting a selected direction.** None of these concepts is part of the
current production release.

## Objective

Turn the marketing site into a concise visual journey from campfire to stars.
The redesign should reduce the current long-form page to roughly 500–600 visible
words, place a meaningful visual in nearly every viewport, and keep one clear
`$9.99` purchase path.

## Shared requirements

- Keep the approved monochrome Founding Tile as the primary identity.
- Use authentic game captures whenever the page makes a gameplay claim.
- Label generated editorial art as key art; never present it as shipped gameplay.
- Preserve verified promises: native macOS, one-time purchase, no ads, no in-app
  purchases, no tracking, local saves, and offline play.
- Keep the homepage focused on the product available now. Move roadmap material
  outside the primary purchase journey.
- Design mobile-first, then verify at `320`, `390`, `768`, and `1440` CSS pixels.
- Respect reduced motion, keyboard navigation, VoiceOver structure, and safe areas.

## Direction 1 — The Living Diorama (recommended)

A cinematic, gameplay-led page that makes the town itself the hero.

- Full-bleed Kingdom scene with a small Founding Tile, one-line promise, price,
  and purchase action.
- Camp, Kingdom, Fusion, and Space become large visual chapters with short captions.
- A brief “Meet three Joes” portrait interlude adds character attachment.
- Slow age crossfades and restrained crop reveals provide motion without clutter.
- Target copy: 300–400 words.

Why it leads: it shows the real game immediately, communicates progression with
minimal explanation, and best supports purchase confidence.

## Direction 2 — The Founding Chronicle

A premium museum-like history of the civilization.

- The Founding Tile opens an artifact table: first camp, first road, first crown,
  and first starport.
- Oversized images pair with short historical captions and dry Joe commentary.
- Chapter numerals, archival portraits, and civilization seals create continuity.
- Target copy: 400–500 words.

Tradeoff: highly distinctive and aligned with history, but less immediately
game-like than the Living Diorama.

## Direction 3 — Meet the Flock

A character-led page centered on memorable named Joes.

- An expressive Joe portrait sits over the living town in the hero.
- Portrait, town scene, short quote, and system-in-action modules alternate.
- Named Joes introduce logistics, research, defense, and exploration.
- Target copy: 250–350 words.

Tradeoff: the warmest and most memorable direction, but new character art must
match the shipped game closely enough to avoid creating a false expectation.

## Approval and implementation gate

Do not blend or implement these directions by assumption. After one direction is
selected:

1. Lock the page sequence, copy budget, and authentic screenshot set.
2. Produce the minimum editorial asset kit required by that direction.
3. Implement the design using the existing dependency-free site architecture.
4. Run accessibility, performance, keyboard, reduced-motion, and responsive QA.
5. Publish a Vercel preview for approval before replacing production.
