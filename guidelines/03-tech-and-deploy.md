# 03 — Tech stack & deploy

The repo must keep building with `npm run build` and deploy to **Vercel** with zero config changes.

## Stack (do not swap)

- **Vite + React + TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (already configured; styles in `src/index.css`)
- **Routing**: `react-router-dom` (`BrowserRouter`), already set up. Routes are generated in `src/App.tsx` from
  `src/prototype/registry.ts`; register a screen there instead of adding a `<Route>` by hand.
  `vercel.json` already rewrites all paths to `index.html`, so deep links work.
- No other dependencies without a reason written in `project/BRIEF.md`. Pre-approved exceptions when the brief
  Fidelity is Mid-fi (Memorisely): `lucide-react`, and the Inter font loaded from Google Fonts in `index.html`
  (see `guidelines/design-system/text.md`).
- No shadcn/ui, Radix, or animation libraries. `guidelines/design-system/README.md` maps them to native HTML.

## Folder structure

```
src/
  main.tsx            # entry, do not rename
  App.tsx             # router, generated from the registry (rarely edited)
  index.css           # Tailwind import, base styles; Mid-fi uncomments the memorisely.css import
  styles/
    memorisely.css    # Mid-fi tokens for Tailwind v4: colors (light + dark), Inter, type scale, easing
    theme.ts          # useTheme(): Light / Dark / System for Mid-fi prototypes with dark mode
  prototype/
    registry.ts       # THE prototype registry: user types, flows, screens, routes, shortcuts
    types.ts          # registry data model
    derive.ts         # derived views (ordering, steps, grouping, flow context, links)
    validate.ts       # integrity checks shown on Prototype Home and in the flow bar
    navigation.tsx    # ScreenLink / useGoToScreen: links between screens by screen ID
    PrototypeHome.tsx # Prototype Flows / All Prototype Screens (visual gallery) / Developer shortcuts
    ScreenPreview.tsx # one gallery preview: the real screen in an inert, scaled iframe
    preview.ts        # preview mode (?preview=1) used by the gallery iframes
    FlowBar.tsx       # flow navigation above each screen
  components/         # shared UI: Placeholder, Note, PhoneFrame, app shell/nav, buttons…
  screens/            # one file per screen: DashboardScreen.tsx… every file here must be registered
                      # (shared parts go in components/, mock data in data/)
  data/               # typed mock data
project/
  BRIEF.md            # the filled-in brief (product source of truth)
```

## Rules

- Do not add a Tailwind CDN `<script>` to `index.html`; Tailwind is compiled at build time.
- Do not use an import map in `index.html`; dependencies go in `package.json`.
- Keep `package.json` scripts `dev`, `build`, `preview` working.
- Do not commit secrets. If an AI feature is requested, read the key from an environment variable
  and document it in `project/BRIEF.md`.

## Deploy

- Vercel settings: Framework preset **Vite**, build command `npm run build`, output `dist`.
- Every push to `main` from AI Studio triggers a Vercel deploy once the repo is linked.
