# AGENTS.md — Instructions for the AI builder (Google AI Studio / Gemini)

You are working inside a **prototype template**. Your job is to turn a short intake conversation into a
clickable prototype that builds with Vite and deploys to Vercel, and to keep every screen connected to the
prototype navigation system for the life of the project.

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
3. When intake is done, write the answers into `project/BRIEF.md` (replace the placeholders),
   show the user a short summary, and ask for a "go" before building.
4. After the brief is confirmed, build flow by flow, following the guidelines. After each batch of screens,
   tell the user what you built and what is next.
5. If a request conflicts with the guidelines, point out the conflict and ask which one wins.
   The user's explicit answer overrides the guidelines. Record the exception in `project/BRIEF.md`
   under "Decisions & exceptions".

## Prototype system rules

`src/prototype/registry.ts` is the **single source of truth** for user types, flows, flow order, screens,
screen order, routes, start screens, status, and developer shortcuts. Prototype Home, All Prototype Screens,
routing, flow navigation, and counts are all derived from it.

**All Prototype Screens is a visual gallery:** show the actual registered screen components side by side, grouped by user type and flow, including rendered variants. Names, descriptions, and route links alone are insufficient. The starter `ScreenRow` text list must be replaced when building product screens. Follow `guidelines/04-prototype-system.md` section 2B and the visual checks in `guidelines/08-ai-workflow.md`.

Never:

- create a screen without registering it (every file in `src/screens/` must be in the registry)
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
3. Create the screen in `src/screens/`, reusing the flow's shell and components.
4. Register it in `registry.ts` with a stable ID and route, and insert its ID in the correct position of the flow's `screenIds`.
5. Run the integrity checklist in `guidelines/08-ai-workflow.md`.

### New flow

1. Confirm the user type and check that no existing flow already covers this journey.
2. Add the flow with ID, name, description, user type, `startScreenId`, and ordered `screenIds`.
3. Register all its screens, then run the integrity checklist.

### Changing existing work

Renames, moves, reorders, deletions, route changes, and user-type changes are applied in the registry and
propagated to every in-screen link. Keep IDs and routes stable when only a display name changes.
See `guidelines/06-screen-flow-rules.md`.

## Final verification

Before finishing any prototype task, open Prototype Home (`/`) and confirm:

- the "Registry issues" box is absent (no orphan screens or flows, no duplicate IDs or routes, no mismatched user types)
- Prototype Flows and All Prototype Screens show the change, with correct order and step numbers
- `Open flow` opens the start screen, and direct screen links open exactly that screen
- previous/next in the flow bar still make sense
- `npm run build` passes

Then report the change in the compact format from `guidelines/08-ai-workflow.md` Phase 7.

## Your first reply

Greet the user in one line, say you have read the guidelines, and start **Phase 1** from
`guidelines/01-intake-questions.md`. Nothing else.
