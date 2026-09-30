# Motion runtime verification

Source: `js/main.js`, Joe Town site mobile update, 2026-09-30.
Preview: http://localhost:8149/
Browser: isolated agent-browser Chrome sessions.

- Global Pause visual effects sets aria-pressed=true, pauses all motion scenes and the Blender hero, and disables local motion controls to preserve global intent.
- Global Resume visual effects preserves local pause intent. Only intersecting scenes run; offscreen delivery and hero stay paused.
- Opening a screenshot dialog pauses all motion scenes and video, locks HTML/body overflow, and focuses Close. Escape restores prior overflow and the screenshot opener without changing global motion intent.
- At 390px width, opening navigation pauses all scenes and video. Escape closes it, resets aria-expanded=false, and focuses the navigation toggle.
- Changing reduced-motion at runtime pauses every CSS scene and video, labels the global control Reduced motion on, and disables global/delivery controls. Existing explicit Play town animation remains available when global user pause is not active.
- With an init-script setting navigator.connection.saveData=true before page scripts: initial global control is Resume visual effects / aria-pressed=true; all scenes and video are paused, and video has no src selected. Explicit global resume enables the visible mobile scene while offscreen delivery remains paused; scrolling to the hero starts playback only after this opt-in.
- Node syntax and Git whitespace checks pass. No page errors on tested normal/reduced-motion interactions.

A transient browser cache issue during evolving local edits left deferred JavaScript unexecuted in some initial navigations, without a page error. Explicit fresh navigation/reload restored execution; test assertions require root .js and visible enhanced controls before accepting results. Production must be verified after source freeze with final asset query versions.

Final review fixes and checks:

- Mobile zoom captions use the authored `data-caption`, preserving "development preview, not the submitted mobile build" in the dialog.
- The screenshot viewport is a labeled focusable region (`tabIndex=0`). Zoom moves focus into it. At 390×844, an iPhone preview has 2257px horizontal overflow; native ArrowRight moves scrollLeft from 0 to 40. Shift+Tab returns to the toolbar; Escape restores the screenshot opener and background overflow. Browser focus outline is visible (`outline-style:auto`).
- With IntersectionObserver set to undefined before page scripts, functional initialization completes, the global control shows Resume visual effects / aria-pressed=true, every scene is paused, video stays paused without a selected source, all content remains readable, and page errors are empty. Observer detection checks constructor type, so unavailable/stubbed implementations select the static fallback.
- Source frozen after the constructor guard, caption preservation, and keyboard region fixes. No commit or push by this agent.
