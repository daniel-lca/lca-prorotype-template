# 07 — UX/UI rules

These rules apply to both the product prototype and the Prototype Home.

They are intentionally generic and should work across projects.

---

## 1. Do Not Make the User Think About Structure

A person looking at the prototype should quickly understand:

- which user type they are viewing
- which flow they are viewing
- what the flow is for
- where the flow starts
- how many steps it contains
- which step they are on
- how to open a specific screen

Labels should be clear without requiring explanation.

Avoid internal team jargon when a simpler product label exists.

---

## 2. Strong Visual Hierarchy

Use hierarchy to communicate structure.

The Prototype Home should visually distinguish:

1. user type
2. flow
3. flow description
4. step/screen
5. actions

Do not give all text and actions equal visual weight.

Primary actions should look primary.

Supporting metadata should look secondary.

---

## 3. Group Related Information

Information that belongs together should look together.

Examples:

- screens from the same flow
- title + description
- step number + screen name
- user type + its flows

Spacing should communicate relationships before borders and decoration do.

Do not solve every grouping problem with cards inside cards.

---

## 4. Scanability

Prototype documentation pages are scanned more often than they are read line by line.

Prefer:

- short flow descriptions
- descriptive screen names
- clear section titles
- visible step order
- predictable placement of actions
- consistent card/list structures

Avoid dense paragraphs inside flow cards.

---

## 5. Consistency

Equivalent things should behave equivalently.

Examples:

- every `Open flow` action behaves the same way
- every screen link opens the exact selected screen
- every user-type section uses the same structure
- every flow card uses the same information hierarchy

Do not introduce one-off interaction patterns without a reason.

---

## 6. Visibility and Feedback

Interactive actions must make their effect clear.

For product screens:

- button states should be visible
- selected states should be visible
- loading should be visible
- success/failure should be visible
- disabled actions should be understandable

For prototype navigation:

- clickable items should look clickable
- the currently viewed screen/flow should be identifiable when appropriate

---

## 7. Reduce Cognitive Load

Do not require users to remember information that can remain visible.

Examples:

- keep the flow name visible
- keep important context on detail screens
- show relevant status near the action it affects
- avoid forcing users to remember the previous screen to understand the current one

Prefer recognition over recall.

---

## 8. Clear Actions

Avoid ambiguous labels such as:

- Continue, when multiple outcomes are possible
- Open, when it is unclear what opens
- Manage, when the actual task can be named
- Submit, when the object being submitted is unclear

Use specific labels when they improve understanding.

For the prototype hub, consistent labels such as `Open flow` and `Open screen` are acceptable because their object is explicit.

---

## 9. Preserve Existing Product Patterns

When adding a screen to an existing prototype:

- inspect neighboring screens
- reuse the same shell/navigation
- reuse existing components
- reuse spacing conventions
- reuse typography hierarchy
- reuse button patterns
- reuse modal/drawer behavior

A new screen should feel like part of the same product.

---

## 10. Responsive and Platform Consistency

Follow the devices & breakpoints defined in `project/BRIEF.md` and `02-lofi-prototype-rules.md`.

Do not accidentally create:

- tablet layouts inside a mobile-only prototype
- desktop navigation inside a mobile flow
- inconsistent content widths
- unrelated breakpoint behavior

For mobile apps, follow the platform in the brief (iOS, Android, or both) for permissions, onboarding, accounts,
notifications, alerts, ratings, and purchases: `guidelines/platform/README.md`. These rules change flows and states,
not visual style.

---

## 11. Prototype Fidelity

The level of fidelity should remain consistent with the project phase.

Do not introduce polished high-fidelity visual treatment into a deliberately low/mid-fidelity prototype unless requested.

Likewise, do not degrade established high-fidelity screens when adding new ones.

---

## 12. Error Prevention

When actions are destructive or irreversible:

- communicate consequence
- require confirmation when appropriate
- avoid placing destructive actions where they can be triggered accidentally

The prototype should represent important confirmation and error states when those states affect the intended UX.

---

## 13. Avoid Redundant Information

Do not repeat the same information in multiple nearby components unless the repetition serves a clear purpose.

If tabs, navigation, or hierarchy already communicates a category, do not duplicate entire sections merely to fill space.

---

## 14. Prefer Simple Structure

Use the minimum structure necessary to make the prototype understandable.

Do not add filters, tabs, accordions, dashboards, summaries, or extra navigation simply because they are common patterns.

Every UI element should have a clear reason to exist.


## All Prototype Screens: visual review

Show actual rendered interfaces side by side in a responsive grid inside each flow group; textual lists alone are insufficient. Keep step number and screen name above every preview, use consistent alignment and spacing, and place routes or technical metadata secondarily.

Previews must stay large enough to recognize and compare adjacent interfaces. Use fewer columns for wide desktop screens instead of unreadable thumbnails, preserve the intended viewport and aspect ratio, and provide an `Open screen` link for long screens. Modal, drawer, and error variants must visibly show their intended state inside their own preview rather than covering Prototype Home.

Keep preview internals inert, including keyboard focus, while the external open-screen link remains accessible. At desktop widths verify multiple previews are visible together; at mobile widths verify labels and links remain usable without page-level horizontal overflow.
