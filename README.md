# SVG Hubs

Next.js character gallery and Deplyze-style workspace demo, rebuilt from the supplied standalone design reference. Includes twelve vector characters, five status expressions/animations, SVG export, React usage copying, editable agent identity, and local preference persistence.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm test
```

For browser tests, first run `npx playwright install chromium`. Tests start the production server automatically after a build.

## Use in your React app

Copy `components/AgentAvatar.tsx` and `lib/avatars.ts` into your project (adjust the `@/` import if needed). Copy the avatar CSS from `app/globals.css`: `.agent-avatar`, `.avatar-body`, state animation selectors and keyframes, plus the reduced-motion media query. No animation library is required.

```tsx
import AgentAvatar from "./components/AgentAvatar";

<AgentAvatar
  avatarId="bubble"
  name="Tafar"
  color="#29B8ED"
  state="thinking"
  size={64}
/>;
```

Props: `avatarId`, `name`, `color` (six-digit hex), `size` (pixels), `state` (`idle`, `thinking`, `working`, `success`, `error`), `className`, and `decorative`. Avatars carry a name/status accessible label; use `decorative` when adjacent text already describes the image. State expressions remain visible when reduced motion disables animation.

Standalone default SVGs are in `public/avatars/`. Regenerate them after editing the registry with `node scripts/export-avatars.mjs`. Gallery exports use the user's selected color. SVG downloads are static; React usage adds the five animated states.

## Architecture

- `lib/avatars.ts`: typed avatar registry, shapes, color validation, static export.
- `components/AgentAvatar.tsx`: reusable SVG renderer and state expressions.
- `components/Hub.tsx`: gallery, customization, exports, browser-persisted agents.
- `components/Workspace.tsx`: sidebar, chat, agent cards, cockpit and sample execution.
- `app/globals.css`: gallery styling, reference-inspired workspace, responsive layout and reduced motion.

The workspace is a scripted demo, not a live AI service. Agent names, colors and avatars persist in this browser under `svg-hubs-agents`. No credentials or environment variables are needed. The original export had scripted chat rather than a backend; this implementation similarly does not modify files, execute tools, or contact external integrations.

## Deployment

Import `dyglo/svg-hubs` in Vercel with the Next.js preset, repository root, `npm ci` install command and `npm run build` build command. No environment variables are required.

## Commerce and licensing

Downloads and copying are implemented. Payments are not configured: commercial prices, licensing terms and a checkout provider must be supplied before selling these assets. No commercial license for the provided character references is asserted by this repository.
