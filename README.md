# SVG Hubs

A single open canvas of 56 animated SVG characters across Originals (12), Grok Bots (8), Dots (4), Heads (16), and Stickers & Symbols (16), built with Next.js. Pick a character and save or copy it directly. One collection dropdown keeps browsing simple. No gallery cards, workspace demo, or animation controls.

Faces automatically look right, left, up and down, blink, breathe, and smile. Symbols sway, pulse, wave or rotate. Different phase offsets make the canvas feel alive. Exports are standalone SVG files with their CSS animation embedded: they work without React or an animation library. All animation respects `prefers-reduced-motion`.

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

Browser tests cover all 56 characters, gaze in each direction, smiling, reduced motion, color customization, SVG download/copy, standalone exports and mobile layout.

## Use in your app

Save an SVG from the canvas or use a default file in `public/avatars/`. Embed it as an image or inline SVG. Animation is included. When placed through an HTML `<img>`, the CSS in the SVG still runs; reduced-motion preferences still apply.

For React, copy `components/AgentAvatar.tsx`, `lib/avatars.ts`, `lib/avatar-animation.ts`, `lib/character-art.ts`, `lib/head-art.ts`, and `lib/sticker-art.ts`. Adjust the `@/` import for your project. No separate animation CSS or animation dependency is needed.

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
- `lib/avatars.ts`: typed registry, families and animated SVG export.
- `lib/sticker-art.ts`: sixteen animated stickers and symbols.
- `lib/head-art.ts`: sixteen cartoon heads with automatic facial animation.
- `lib/character-art.ts`: shared vector artwork for the new families, including outfits and accessories.
- `lib/avatar-animation.ts`: shared look, blink, smile and status keyframes.
- `app/globals.css`: responsive paper canvas.

No backend, credentials, or environment variables are required. The earlier Deplyze-style workspace demo has been removed from the public site. This repository does not contain the live Deplyze app.

## Deploy

Vercel uses the Next.js preset, repository root and `npm run build`. Pushes to `main` deploy production.

## Commerce and licensing

Save and Copy are available directly. Payments are not configured. Commercial prices, licensing terms and a checkout provider must be supplied before selling these assets. No commercial license for the provided character references is asserted by this repository.

The Grok Bots and Dots collections are vector interpretations of supplied visual references, not official provider assets. The Dots include a beret, frog eyes, round glasses and heart sunglasses. Heads includes sixteen flat cartoon portraits with hairstyles, racing helmets, goggles, TV helmets and space visors.

## Canvas entrance

Every collection enters from above the canvas, squashes against its measured bottom edge, bounces twice and settles into its layout. The Web Animations API animates a separate wrapper with transforms; characters keep their own SVG animations. Entrance duration is 1.6 seconds with a maximum 320 ms stagger. Switching collections cancels previous entrances. Resizing or enabling reduced motion cancels motion safely. Reduced-motion visitors see the completed layout directly. The entrance is canvas-only and is never included in exported SVGs.
