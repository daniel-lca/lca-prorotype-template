# 06 — Screen & flow rules

This file defines how prototype structure must change throughout the life of a project.

---

## 1. Creating a Screen

Before creating a screen:

1. Identify the user type.
2. Identify the user goal.
3. Find the existing flow that represents that goal.
4. Inspect adjacent screens.
5. Confirm the requested screen does not already exist.

After creating the screen:

1. Assign a unique screen ID.
2. Assign a clear display name.
3. Assign a stable route.
4. Register it in the central prototype registry.
5. Associate it with the correct user type.
6. Associate it with the correct flow.
7. Insert it in the correct chronological position.
8. Add a short description when useful.
9. Verify the flow's starting screen is still correct.
10. Verify Prototype Flows.
11. Verify All Prototype Screens.
12. Verify direct navigation.

### Never

- create an unregistered screen
- append every new screen to the end of a flow without evaluating its actual position
- create a new flow only because adding a screen to an existing flow requires more reasoning
- use duplicate screen IDs
- use duplicate routes

---

## 2. Creating a Flow

Create a new flow only when the user journey is meaningfully distinct from existing flows.

Required flow data:

- unique ID
- display title
- short description
- user type
- ordered screens
- explicit starting screen
- optional status

Before creating it, check whether:

- the journey already exists
- it is actually a sub-flow of another journey
- the requested work belongs inside an existing flow

After creation, verify it appears under the correct user type in both prototype views.

---

## 3. Renaming a Screen

When a screen is renamed:

Update all relevant:

- registry labels
- flow labels
- direct navigation labels
- developer shortcuts
- references in documentation

The route and ID should remain stable unless there is a real reason to change them.

Display names are allowed to evolve.

Stable IDs should not casually change.

---

## 4. Renaming a Flow

Update:

- flow title
- flow description if needed
- visible Prototype Home labels
- related documentation

Do not automatically change the flow ID just because the display title changed.

Stable identifiers reduce broken references.

---

## 5. Moving a Screen to Another Flow

When a screen moves:

1. Remove it from the previous flow.
2. Update its flow relationship.
3. Add it to the new flow.
4. Set the correct order.
5. Check user-type compatibility.
6. Update navigation assumptions.
7. Verify both prototype indexes.
8. Verify there are no stale references.

Do not duplicate the screen in two flows unless the project intentionally supports shared screens.

If a screen is shared, define that relationship explicitly.

---

## 6. Reordering Screens

The sequence displayed in Prototype Flows and All Prototype Screens must match the actual intended user journey.

When order changes:

- update the authoritative flow ordering
- update previous/next behavior if present
- verify step numbers
- verify displayed summaries

Do not manually reorder one prototype section without updating the source of truth.

---

## 7. Removing a Screen

Deleting the visual component is not enough.

When removing a screen:

1. Remove or redirect its route.
2. Remove its registry entry.
3. Remove its reference from the flow.
4. Remove shortcut references.
5. Recalculate step order if necessary.
6. Check whether the flow still has a valid starting screen.
7. Check for links from other screens.
8. Verify Prototype Flows.
9. Verify All Prototype Screens.

If the screen should remain accessible for historical comparison, mark it deprecated instead of pretending it no longer exists.

---

## 8. Removing a Flow

Before removing a flow:

- inspect all screens assigned to it
- move or remove those screens intentionally
- remove flow references
- remove flow entry points
- remove shortcuts

A flow cannot be deleted while leaving its screens orphaned.

---

## 9. Standalone Screens

Standalone screens should be rare.

Examples may include:

- design-system playground
- global error reference
- component test page

If supported, they must be explicitly classified as standalone.

Never use "standalone" as a shortcut for not deciding where a product screen belongs.

---

## 10. Shared Screens

Some screens may be reachable from multiple flows.

When this occurs:

- keep one screen definition
- keep one route
- document the screen as shared
- reference it from multiple flows only when intentional
- link to it with `ScreenLink` / `useGoToScreen`, so the reviewer stays in the flow they came from (`?flow=`)

Do not duplicate components or metadata simply to make flow lists easier.

---

## 11. Edge Cases

Important edge cases should be visible in the prototype system when they materially affect implementation or product review.

Examples:

- failed payment
- rejected verification
- empty dashboard
- no search results
- blocked user
- expired invitation
- canceled booking

They may be:

- dedicated screens
- registered variants
- developer shortcuts

The chosen method must remain consistent within the project.
