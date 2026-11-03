# 08 — AI workflow for prototype tasks

This workflow applies to every AI-assisted prototype change.

The objective is to prevent isolated screens, broken navigation, duplicate flows, and outdated prototype documentation.

---

## Phase 1 — Understand

Before changing code or UI:

1. Read `project/BRIEF.md`.
2. Read the prototype-system rules.
3. Inspect the current registry (`src/prototype/registry.ts`).
4. Inspect the relevant user type.
5. Inspect the relevant flow.
6. Inspect adjacent screens.
7. Inspect existing reusable components.
8. Inspect existing routes.

Then determine:

- What user is performing this task?
- What are they trying to accomplish?
- Which flow contains this task?
- Where does this screen belong in the journey?
- What comes immediately before it?
- What comes immediately after it?
- Does a similar screen already exist?
- Does an existing component already solve part of the request?

Do not implement before answering these questions internally.

---

## Phase 2 — Plan the Structural Change

Classify the request:

### A. New screen in existing flow
Update:
- component
- route
- screen registry
- flow order

### B. New flow
Update:
- flow registry
- screens
- routes
- Prototype Home derived views

### C. Visual-only update
Preserve:
- screen ID
- route
- flow membership
- flow order

unless the user explicitly requests structural change.

### D. Rename
Update visible metadata and references while preserving stable identifiers where possible.

### E. Move/reorder
Update the authoritative flow structure.

### F. Delete
Remove every structural reference, not only the visual component.

---

## Phase 3 — Implement

Follow the project's established:

- design system
- component patterns
- spacing
- typography
- navigation
- interaction patterns
- responsive behavior
- data conventions

Avoid creating a new visual language for one screen.

Reuse before inventing.

---

## Phase 4 — Register

Any new structural prototype work must be reflected in the central registry.

For a new screen verify:

- ID
- name
- description
- user type
- flow
- route
- order
- status if used

For a new flow verify:

- ID
- name
- description
- user type
- start screen
- ordered screens
- status if used

---

## Phase 5 — Synchronize

Confirm the registry correctly drives:

### Prototype Flows
- correct user group
- correct flow
- correct description
- correct step count
- correct order
- correct `Open flow`

### All Prototype Screens
- correct user group
- correct flow group
- correct screen
- correct step/order
- correct direct route

### Developer Shortcuts
If the screen or state belongs there, update the reference.

Do not manually patch the UI to hide registry problems.

Fix the registry.

---

## Phase 6 — Integrity Check

Before considering the task complete, validate:

### IDs
- [ ] Every user type ID is unique.
- [ ] Every flow ID is unique.
- [ ] Every screen ID is unique.

### Relationships
- [ ] Every normal screen belongs to a valid flow.
- [ ] Every flow belongs to a valid user type.
- [ ] Every screen's user type matches its flow.
- [ ] Shared screens are intentionally declared.

### Routes
- [ ] Every registered screen has a valid route.
- [ ] No duplicate routes exist.
- [ ] Direct screen links work.
- [ ] Flow entry links work.

### Ordering
- [ ] Screen order reflects the intended journey.
- [ ] Step labels/numbers are correct.
- [ ] The flow start screen is correct.

### Prototype Home
- [ ] Prototype Flows is current.
- [ ] All Prototype Screens is current.
- [ ] Screen counts are current.
- [ ] Flow counts are current if displayed.
- [ ] Developer shortcuts are current if relevant.

### Cleanup
- [ ] No stale metadata remains.
- [ ] No removed screen is still linked.
- [ ] No orphan screen exists.
- [ ] No orphan flow exists.
- [ ] No duplicate screen implementation was created unnecessarily.

---

## Phase 7 — Completion Report

When useful, summarize prototype structural changes using a compact format:

```text
Updated
- Flow: [name]
- Added screens: [names]
- Updated routes: [routes]
- Registry synchronized: yes
- Prototype Flows synchronized: yes
- All Prototype Screens synchronized: yes
- Integrity issues: none
```

Do not claim completion if integrity issues remain.


## Visual gallery verification

Before completion, verify that All Prototype Screens shows actual registered screen components as a side-by-side preview gallery, not a text-only list. Confirm that variants appear next to their parent without adding journey steps, and that standalone screens appear in their own visual group.

Check that each preview matches its direct route and intended state, uses deterministic data, cannot mutate state or navigate while previewed, keeps embedded controls out of the keyboard order, and provides an accessible external `Open screen` link. Check that modal and drawer states remain contained, tooling bars are excluded, and product styling is preserved. Visually inspect the gallery at desktop and mobile widths for legible previews, multiple side-by-side desktop screens, and no page-level horizontal overflow.

The template's gallery (`ScreenPreview.tsx`) already meets these rules. Do not replace it with a text-only list, placeholder gallery, or static screenshot gallery. If a preview is blank or shows the wrong state, fix the screen so it renders its intended state on direct load.
