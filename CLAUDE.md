# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # Install dependencies
npm run dev    # Start dev server (Vite)
npm run build  # Production build → dist/
npm run preview # Preview production build locally
npm run deploy # Build + deploy to GitHub Pages via gh-pages
```

No test suite is configured.

## Architecture

This is a Vue 3 + Vite personal portfolio site with two distinct sections:

### Routes (`src/router/routes.ts`)
- `/` — `RootView`: Traditional portfolio page with an animated 2D canvas background and article/project listings
- `/os` — `SceneView`: Interactive 3D portfolio built on Three.js, rendered as a simulated desktop OS

### Two rendering systems

**`src/composables/useAnimatedBackground.js`** — Used by `RootView`. Drives a 2D canvas animation using the `two-easy-engine` library with animated point lights.

**`src/composables/useScene.js`** — Used by `SceneView`. Sets up a full Three.js scene (renderer, camera, OrbitControls, lights, GLB meshes), then instantiates two subsystems:
- `src/three/os/` — Desktop OS simulation (browser, desktop, startBar, startMenu, startScreen, trashbin, lightApp, paint, snake). Shown when screen width ≥ 800px.
- `src/three/mobile/` — Mobile layout simulation (browser, home, lightApp, paint, snake). Shown when screen width < 800px.

The `os` object uses `THREE.EventDispatcher` to emit `stateChanged` events. `SceneView` listens on the adapter to toggle overlay UI (loading spinner → "Power up" button → hidden once the OS is active).

### Scene setup modules (`src/three/scene/`)
Each file exports a single setup or event-registration function:
- `scene.js`, `renderer.js`, `camera.js`, `light.js`, `meshes.js` — Three.js object creation
- `clickEvent.js`, `dragEvent.js`, `keyEvent.js`, `loopEvent.js`, `resizeEvent.js` — global event listeners with add/remove pairs

### Static assets
- `public/meshes/` — GLB 3D models (chair, coffee, floor, keyboard, monitor, etc.)
- `public/icons/` — PNG icons used in the Three.js OS UI
- `public/examples/` — Screenshots used in the portfolio

### Content
Articles/projects are defined in `src/assets/articles.js` as a default-exported array (currently empty — add entries here to populate the portfolio).

### Styling
Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Global styles in `src/style.css`. The `SceneView` uses scoped `<style>` blocks due to its overlay UI being separate from Tailwind.
