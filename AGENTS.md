# AGENTS.md — Instructions for the AI builder (Google AI Studio / Gemini)

You are working inside a **prototype template**. Your job is to turn a short intake conversation into a
clickable prototype that builds with Vite and deploys to Vercel, and to keep every screen connected to the
prototype navigation system for the life of the project.

## If you start automatically after the import

AI Studio can start working as soon as this repository is imported, before the user sends a message.
In that case, follow these rules:

1. Read this file and every file in "Read first".
2. You may install the dependencies in `package.json` and start the dev server (`npm run dev`).
3. Do not change, add, move, or delete files. The project already runs as it is: Vite, React, TypeScript, and
   Tailwind CSS v4, with `src/main.tsx` as the entry point.
4. Do not convert the project to another structure. Do not add a root `index.tsx`, an import map, a Tailwind
   CDN script, a `server/` folder, or a Gemini API call.
5. Do not build a first version of the app. The registry stays empty until the intake is done.
   Prototype Home shows an empty state on purpose.
6. Send the reply described in "Your first reply" at the end of this file.

If a template file is missing after the import (for example the dev server cannot resolve a file that
`src/index.css` imports), name it in your first reply so the user can report it. Do not replace it with a guess.

If you changed files before you read this, list each changed file in your reply. Then restore each file to its
imported content. Keep `package-lock.json` only.

## Read first

Before your first reply, read in this order:

1. `guidelines/01-intake-questions.md` — the questions you must ask, phase by phase.
2. `guidelines/02-lofi-prototype-rules.md` — how the prototype must look and behave.
3. `guidelines/03-tech-and-deploy.md` — stack, folder structure, and Vercel constraints.
4. `guidelines/04-prototype-system.md` — Prototype Home, flows, screens, single source of truth.
5. `guidelines/05-prototype-schema.md` — the registry data model and where it lives in this repo.
6. `guidelines/06-screen-flow-rules.md` — how to create, rename, move, reorder, and remove screens and flows.
7. `guidelines/07-ux-ui-rules.md` — UX rules for Prototype Home and product screens.
8. `guidelines/08-ai-workflow.md` — the required workflow and integrity checklist for every prototype task.
9. `guidelines/design-system/README.md` — which design-system files apply at which fidelity. Open the
   individual files when the task touches their topic.
10. `project/BRIEF.md` — the product brief.

Before any later prototype task, re-read `project/BRIEF.md` and inspect `src/prototype/registry.ts`, the relevant
flow, its adjacent screens, and existing components. Do not assume a flow, screen, route, user type, or component
does not exist before checking.

## Intake rules

1. **Do not write or change app code until the intake is complete and the user confirms the brief.**
   The template ships with an empty registry on purpose; Prototype Home shows an empty state. Leave it alone during intake.
2. Run the intake as a conversation, **one phase at a time**. Wait for answers before moving on.
   If the user shares a PRD or another product document, follow "If the user shares a PRD" in
   `guidelines/01-intake-questions.md` instead: ask only what the document does not answer.
3. When intake is done, write the answers into `project/BRIEF.md` (replace the placeholders),
   show the user a short summary, and ask for a "go" before building.
4. After the user says "go", run **project setup** once, before you build any screen. Follow
   "After the go: project setup" in `guidelines/01-intake-questions.md`. It replaces this template's
   `README.md` with a README for the product, renames the app, page title, and registry, and sets
   `registry.fidelity` (it decides which design checks run).
5. Then build flow by flow, following the guidelines. After each batch of screens,
   tell the user what you built and what is next.
6. If a request conflicts with the guidelines, point out the conflict and ask which one wins.
   The user's explicit answer overrides the guidelines. Record the exception in `project/BRIEF.md`
   under "Decisions & exceptions".

## Prototype system rules

`src/prototype/registry.ts` is the **single source of truth** for user types, flows, flow order, screens,
screen order, routes, start screens, status, and developer shortcuts. Prototype Home, All Prototype Screens,
routing, flow navigation, and counts are all derived from it.

**All Prototype Screens is a visual gallery, and it is already built.** Prototype Home renders every registered
screen and variant side by side with `src/prototype/ScreenPreview.tsx`. Do not replace it with a text list, and do
not build a second gallery. If the prototype is mobile-only, set `previewViewport: { width: 390, height: 844 }` in
the registry. See `guidelines/04-prototype-system.md` section 2B and the visual checks in `guidelines/08-ai-workflow.md`.

**Screens link to other screens by screen ID**, with `ScreenLink` or `useGoToScreen` from
`src/prototype/navigation.tsx`. Never write a route string inside a screen.

**Build screens from the components in `src/components/ui`**: shadcn/ui on Radix (`Button`, `Input`, `Select`,
`Card`, `Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `Tabs`, `Table`, `Badge`, `Empty`, `toast()`…). They already
follow the design rules at every fidelity; the active theme file in `src/index.css` sets their colors. Compose with
`asChild` (`<Button asChild><ScreenLink to="…">…</ScreenLink></Button>`). Never hand-build a modal, sheet, or menu.
See `guidelines/design-system/README.md`, "Components".

**The design check enforces the design rules.** In development, Prototype Home lists every class in
`src/screens/` and `src/components/` that breaks the rules for `registry.fidelity`, with the class to use instead,
and the flow bar shows a "design issues" badge. Fix every design issue in the screens you build. Do not edit
`src/prototype/designRules.ts` to make an issue disappear.

**Prototype Home and the flow bar are tooling.** They use the LowCode Agency brand (`src/prototype/tooling.css`) at
every fidelity. Do not restyle them, and never use `lca-*` classes in product screens.

Never:

- create a screen without registering it (every file in `src/screens/` must be in the registry)
- hardcode a route in a screen, or use `<Link to="/…">` / `navigate("/…")` between screens
- maintain Prototype Flows and All Prototype Screens as separate lists, or hardcode flows/screens in any view
- leave a screen without a flow unless it is explicitly `standalone: true`
- leave a flow without a valid user type
- leave a route broken or duplicated
- silently create a new flow when a suitable one already exists
- append a screen to the end of a flow without deciding its real position in the journey
- silently change the user journey while making visual changes
- report a task as done while Prototype Home shows registry issues

### New screen

1. Identify the user type and the existing flow it belongs to.
2. Inspect adjacent screens in that flow and confirm the screen does not already exist.
3. Create the screen in `src/screens/`, reusing the flow's shell, `src/components/ui`, and your shared components. Link to other screens with `ScreenLink` / `useGoToScreen`.
4. Register it in `registry.ts` with a stable ID and route, and insert its ID in the correct position of the flow's `screenIds`.
5. Run the integrity checklist in `guidelines/08-ai-workflow.md`.

### New flow

1. Confirm the user type and check that no existing flow already covers this journey.
2. Add the flow with ID, name, description, user type, `startScreenId`, and ordered `screenIds`.
3. Register all its screens, then run the integrity checklist.

### Changing existing work

Renames, moves, reorders, deletions, route changes, and user-type changes are applied in the registry. In-screen
links use screen IDs, so a route change needs no link edits; a removed or renamed ID shows as a dashed "unknown
screen" link and a console error. Keep IDs and routes stable when only a display name changes.
See `guidelines/06-screen-flow-rules.md`.

## Final verification

Before finishing any prototype task, open Prototype Home (`/`) and confirm:

- the "Registry issues" box is absent (no orphan screens or flows, no duplicate IDs or routes, no mismatched user types),
  and the flow bar on your screens shows no "registry issues" badge
- the checks line under the stats says "Design check: no issues", and the flow bar shows no "design issues" badge
- Prototype Flows and All Prototype Screens show the change, with correct order and step numbers, and each new
  screen or variant has a rendered preview that shows its intended state
- the browser console has no "Unknown screen ID" errors
- `Open flow` opens the start screen, and direct screen links open exactly that screen
- previous/next in the flow bar still make sense
- `npm run build` passes

Then report the change in the compact format from `guidelines/08-ai-workflow.md` Phase 7.

## Your first reply

Greet the user in one line, say you have read the guidelines, and start **Phase 1** from
`guidelines/01-intake-questions.md`. Add one line: "You can also paste a PRD or product brief, and I will ask only
what it does not answer." Nothing else.

If the user's first message already contains a PRD, skip the greeting and follow the PRD path in
`guidelines/01-intake-questions.md`.
