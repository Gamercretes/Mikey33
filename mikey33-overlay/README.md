# MIKEY33 Livestream Overlay

Transparent, looping 3D metallic animation of the MIKEY33 logo, built for
OBS/Moblin browser sources. Each loop pops in fast from small/invisible,
tilts and floats through its 3D sweep, holds, then pops back out small
before repeating.

## Files
- index.html — page shell
- style.css — all animation (transform/opacity keyframes + masked light sweep)
- script.js — tiny helper (pauses animation when tab is hidden, keeps the
  light-sweep mask in sync with the logo image)
- assets/logo.png — your uploaded logo, untouched

## Test locally
Open index.html directly in a browser (double-click it, or run a tiny local
server: `python3 -m http.server` from this folder, then visit
http://localhost:8000). You should see only the logo — no background, no
UI — animating on a loop.

## Host it (any of these work)
- GitHub Pages: push this folder to a repo, enable Pages on the main
  branch, use the published URL.
- Cloudflare Pages / Netlify: drag-and-drop this folder in their dashboard
  (no build step needed) and use the deployed URL.

## Use in Moblin
Add a Browser/URL scene source, paste your hosted URL, and set the source
size to roughly match how big you want the watermark on stream (it scales
responsively, so the corner-sized default in style.css works well small).
Leave "transparent background" style options on if Moblin exposes one —
the page itself already renders transparent.

## Tuning
Open style.css and adjust the variables at the top of the file:
- --loop-duration — total loop length (currently 8s)
- --pop-scale-start — how small the logo is at the very start/end of the
  loop, right before it pops in / after it pops out (currently 0.35)
- --pop-overshoot — how far it overshoots past full size on the way in,
  for a punchy pop (currently 1.06)
- --logo-max-width / --logo-width — on-screen size
- --tilt-max — how far it rotates (kept subtle by default)
- --bob — float distance

The pop-in/pop-out timing itself lives in the first (0%–7%) and last
(96%–100%) steps of the `mikeyLoop` keyframes in style.css, each with
its own easing so the pop reads fast and snappy against the slower
tilt/float in the middle.
