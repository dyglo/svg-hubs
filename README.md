# SVG Hubs

A single open canvas of twelve animated SVG characters, built with Next.js. Pick a character and save or copy it directly. No gallery cards, workspace demo, or animation controls.

Every character automatically looks right, left, up and down, blinks, breathes, and smiles. Different phase offsets make the canvas feel alive. Exports are standalone SVG files with their CSS animation embedded: they work without React or an animation library. All animation respects `prefers-reduced-motion`.

## Develop and verify

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Browser tests cover all twelve characters, gaze in each direction, smiling, reduced motion, color customization, SVG download/copy, standalone exports and mobile layout.

## Use in your app

Save an SVG from the canvas or use a default file in `public/avatars/`. Embed it as an image or inline SVG. Animation is included. When placed through an HTML `<img>`, the CSS in the SVG still runs; reduced-motion preferences still apply.

For React, copy `components/AgentAvatar.tsx`, `lib/avatars.ts` and `lib/avatar-animation.ts`. Adjust the `@/` import for your project. No separate animation CSS or animation dependency is needed.

```tsx
import AgentAvatar from "./components/AgentAvatar";

<AgentAvatar avatarId="star" name="Stella" size={80} color="#FFCD48" />;
```

Props: `avatarId`, `name`, `color` (six-digit hex), `size` (pixels), `delay` (seconds; use negative values for staggered phases), `className`, `decorative`, and optional `state` (`idle`, `thinking`, `working`, `success`, `error`). Gaze, blinking and smiles are automatic; a state can additionally change body movement or show an error expression. Use `decorative` when adjacent text already labels the character.

Add layout CSS for the wrapper:

```css
.agent-avatar {
  display: inline-block;
  flex-shrink: 0;
}
.agent-avatar > svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
```

Regenerate the default exports after editing shapes or animation:

```sh
node scripts/export-avatars.mjs
```

## Architecture

- `components/Canvas.tsx`: open canvas, character selection, color swatches, save/copy.
- `components/AgentAvatar.tsx`: reusable accessible SVG renderer.
- `lib/avatars.ts`: typed registry and animated SVG export.
- `lib/avatar-animation.ts`: shared look, blink, smile and status keyframes.
- `app/globals.css`: responsive paper canvas.

No backend, credentials, or environment variables are required. The earlier Deplyze-style workspace demo has been removed from the public site. This repository does not contain the live Deplyze app.

## Deploy

Vercel uses the Next.js preset, repository root and `npm run build`. Pushes to `main` deploy production.

## Commerce and licensing

Save and Copy are available directly. Payments are not configured. Commercial prices, licensing terms and a checkout provider must be supplied before selling these assets. No commercial license for the provided character references is asserted by this repository.
