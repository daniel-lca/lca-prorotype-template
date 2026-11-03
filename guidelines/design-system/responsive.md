# Design system — Responsive

> A practical responsive design system for building prototypes that adapt intentionally across screen sizes. Built around mobile-first Tailwind breakpoints, fluid layouts, reduced mobile spacing and typography that preserves hierarchy at every viewport.

> **When this applies:** every prototype, at every fidelity. In lo-fi, apply the behavior and structure rules; colors, radius and icon specifics give way to `02-lofi-prototype-rules.md`. The brief's breakpoint answer decides which viewports exist (e.g. desktop-only or mobile-only skips the other layouts).
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Responsive design is not shrinking a desktop interface until it fits on mobile.

Design each layout so content, hierarchy, navigation and interaction adapt to the available space.

Start with the smallest useful layout, then progressively enhance it as space becomes available.

Use breakpoints when the **layout needs to change**, not because a specific device exists.

---

## 1. Breakpoints

Use Tailwind's default mobile-first breakpoints:

```text
Base      < 640px
sm        ≥ 640px
md        ≥ 768px
lg        ≥ 1024px
xl        ≥ 1280px
2xl       ≥ 1536px
```

Equivalent CSS:

```css
/* Base styles are mobile-first */

@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

Do not invent device-specific breakpoints such as `iPhone`, `iPad` or `MacBook`.

Do not add a custom breakpoint because one screen looks slightly awkward.

First check whether the layout, container or component should be more fluid.

---

## 2. Mobile first

Write the base interface for small screens.

Add complexity as viewport space increases.

Prefer:

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

Rather than designing desktop first and repeatedly overriding it downward.

Base styles should work without a breakpoint.

Breakpoints should progressively enhance the layout.

---

## 3. Do not use every breakpoint

A component does not need styles at `sm`, `md`, `lg`, `xl` and `2xl`.

Use the fewest breakpoints required.

A common product pattern may only need:

```text
Base   Mobile
md     Tablet / larger layouts
lg     Desktop
```

Marketing layouts may additionally benefit from `xl` or `2xl`.

Do not create breakpoint noise.

If nothing meaningful changes, do not add a breakpoint.

---

## 4. Page gutters

Reduce page gutters on smaller screens.

Use a consistent responsive pattern:

```text
Mobile      16px
Tablet      24px
Desktop     32px
Large       40px
```

Example:

```html
<main class="px-4 md:px-6 lg:px-8 xl:px-10">
```

For particularly dense product interfaces, desktop gutters may remain at `24px` or `32px`.

Do not use desktop-sized 48–64px page padding on mobile.

Do not remove all mobile gutter unless content is intentionally edge-to-edge.

---

## 5. Section spacing

Reduce spacing between major sections as the viewport becomes smaller.

Large desktop spacing should not be carried directly onto mobile.

A useful pattern:

```text
Large marketing section
Desktop     96px
Tablet      64px
Mobile      48px

Standard marketing section
Desktop     64px
Tablet      48px
Mobile      32px

Product section
Desktop     40–48px
Tablet      32–40px
Mobile      24–32px
```

Example:

```html
<section class="py-12 md:py-16 lg:py-24">
```

Maintain the relationship between sections even as values reduce.

Do not collapse every spacing value to the same mobile value.

---

## 6. Component spacing

Do not scale every small spacing value down on mobile.

Relationships such as these usually remain stable:

```text
Icon ↔ label           6–8px
Label ↕ input          6–8px
Input ↕ helper text    4–6px
Button icon ↔ text     6–8px
```

Reduce page-level and section-level spacing before reducing component-level spacing.

Small internal spacing communicates relationships and should remain consistent unless the component itself changes density.

---

## 7. Marketing typography

Marketing type must scale intentionally.

Use the text hierarchy from [text.md](text.md).

### Display

```text
Desktop / xl    96px
Tablet          72px
Mobile          48px
```

Example:

```html
<h1 class="text-5xl md:text-7xl xl:text-8xl">
```

Where exact design-system values are required, use the project's shared typography utilities or tokens (Mid-fi: the `@theme` text tokens in [text.md](text.md)) rather than arbitrary one-off values.

### Heading 1

```text
Desktop     72px
Tablet      56px
Mobile      40px
```

### Heading 2

```text
Desktop     56px
Tablet      40px
Mobile      32px
```

### Heading 3

```text
Desktop     40px
Tablet      32px
Mobile      28px
```

### Heading 4

```text
Desktop     32px
Tablet      28px
Mobile      24px
```

### Lead

```text
Desktop     24px
Mobile      20px
```

### Body

Standard body copy can usually remain `16px`.

Do not aggressively reduce body text on mobile.

---

## 8. Product typography

Product typography requires less dramatic scaling.

Typical behavior:

```text
Page title
Desktop     32px
Mobile      28px

Heading 1
Desktop     24px
Mobile      22–24px

Heading 2
Desktop     20px
Mobile      18–20px

Heading 3
Desktop     16px
Mobile      16px

Body
Desktop     14px
Mobile      14–16px
```

Do not make dense desktop product typography tiny on mobile.

Mobile often needs equal or slightly larger body text because the viewing context is less forgiving.

Maintain the hierarchy rather than proportionally shrinking every style.

---

## 9. Fluid typography

Use breakpoint-based typography by default because it is predictable and easy to maintain.

Use `clamp()` selectively for large marketing typography where continuous scaling improves the composition.

Example:

```css
font-size: clamp(3rem, 6vw, 6rem);
```

Do not use fluid type for every UI label, button and body style.

Product UI usually benefits from discrete, stable type sizes.

---

## 10. Containers

Use max-width containers to prevent content stretching indefinitely.

Typical marketing container:

```html
<div class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
```

Typical reading content should be significantly narrower.

Do not make paragraphs span the full width of a desktop container.

Product layouts may use the available viewport more fully when the task benefits from it.

Choose container width based on content, not simply the largest screen available.

---

## 11. Grids

Reduce column count as available width decreases.

Typical:

```text
Desktop     3–4 columns
Tablet      2 columns
Mobile      1 column
```

Example:

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

Do not preserve a desktop column count by making every item extremely narrow.

Do not automatically turn every grid into one column at `md` if two columns still work comfortably.

Let content determine the transition.

---

## 12. Layout direction

Horizontal desktop layouts often become vertical on smaller screens.

Example:

```html
<div class="flex flex-col gap-6 lg:flex-row lg:gap-8">
```

But do not automatically stack everything.

Some relationships should remain horizontal on mobile:

- Icon + label
- Compact actions
- Segmented controls when they fit
- Small metadata groups
- Previous / next navigation

Responsive design means choosing the appropriate composition, not applying `flex-col` universally.

---

## 13. Sidebars

Persistent sidebars generally should not consume mobile viewport width.

Typical behavior:

```text
Desktop     Persistent sidebar
Tablet      Compact or collapsible sidebar
Mobile      Sheet / drawer / alternate navigation
```

At `lg` and above, a persistent sidebar often works well.

Below `lg`, consider whether it should collapse.

On mobile, move secondary navigation into a sheet or dedicated navigation pattern.

Do not simply shrink a 240px desktop sidebar to 80px on a phone.

---

## 14. Navigation

Navigation should adapt to available space.

### Marketing

Desktop navigation can expose primary links.

Mobile navigation can move links into a menu or sheet.

Keep the primary action available where appropriate.

### Product

Prioritize frequent actions and primary destinations.

Do not hide critical product functionality simply because the viewport is smaller.

Use:

- Bottom navigation
- Sheets
- Drawers
- Compact headers
- Overflow menus

only when appropriate to the product.

Do not automatically use a hamburger menu for every mobile interface.

---

## 15. Cards

Cards should adapt to their container.

On mobile:

- Reduce outer page spacing before aggressively reducing card padding
- Allow cards to use the full available width
- Consider whether containment is still necessary
- Avoid nested cards becoming visually cramped

Typical card padding:

```text
Desktop     20–24px
Mobile      16–20px
```

A card that becomes edge-to-edge may reduce or remove radius on edges that meet the viewport.

Do not preserve large desktop card padding on narrow screens.

---

## 16. Forms

Forms should usually become simpler and more linear on mobile.

Typical behavior:

```text
Desktop     Related fields may share a row
Mobile      Fields stack vertically
```

Example:

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
```

Inputs should generally occupy the available mobile width.

Keep labels visible.

Do not rely on placeholders instead of labels to save space.

Primary form actions may become full width on mobile where appropriate.

---

## 17. Buttons and actions

Do not simply shrink buttons on mobile.

Touch interfaces need comfortable targets.

Aim for approximately `44px` minimum touch targets where practical.

A 16px icon can sit inside a 40–44px interactive target.

For action groups:

```text
Desktop     Actions may sit inline
Mobile      Stack or wrap when labels no longer fit comfortably
```

Keep primary actions easy to reach and visually clear.

Do not allow action labels to become unreadably compressed.

---

## 18. Tables

Do not squeeze wide desktop tables into narrow mobile screens.

Choose a strategy based on the task.

Options include:

- Horizontal scrolling
- Hiding genuinely secondary columns
- Converting rows into structured mobile cards
- Providing a focused detail view

Do not remove important information merely to avoid horizontal scrolling.

For data-heavy professional tools, horizontal scrolling can be preferable to transforming every table into cards.

Keep table headers and key identifiers understandable.

---

## 19. Dialogs

Desktop dialogs can be centered floating surfaces.

On smaller screens, adapt based on complexity.

Typical:

```text
Desktop     Centered dialog
Mobile      Wider dialog, bottom sheet or full-screen flow
```

Do not force complex forms into tiny centered mobile dialogs.

If a dialog becomes full screen, remove radius from edges that meet the viewport.

Keep dismiss and primary actions reachable.

---

## 20. Images and media

Media should be responsive by default.

Use:

```css
max-width: 100%;
height: auto;
```

Preserve meaningful aspect ratios.

Use `object-fit` intentionally.

Do not crop important content merely to preserve a desktop composition.

Marketing art direction may use different crops or arrangements at different breakpoints when the content requires it.

---

## 21. Content priority

Responsive design is also information prioritization.

On smaller screens:

- Keep the primary task visible
- Keep essential context
- Reduce secondary decoration
- Move secondary actions into appropriate overflow patterns
- Simplify composition

Do not hide content simply because it is difficult to fit.

Ask whether it is essential to the user's task before removing it.

---

## 22. Reordering

Avoid changing content order purely for visual convenience when it damages reading or keyboard order.

DOM order should generally match the logical reading order.

Use CSS reordering carefully.

Screen-reader, keyboard and visual order should remain understandable.

---

## 23. Hover

Do not design interactions that depend on hover.

Hover is an enhancement for pointer devices.

Anything essential revealed on hover must also be accessible through focus, tap or another explicit interaction.

Do not hide primary actions behind hover-only behavior on mobile-relevant interfaces.

---

## 24. Responsive radius

Most component radius values remain stable across breakpoints.

Example:

```text
Button     6px on all sizes
Input      6px on all sizes
Card       8px on all sizes
```

Change radius when the component's relationship to the viewport changes.

Example:

```text
Desktop dialog       12px
Mobile full screen    0px
```

Do not scale radius proportionally with viewport size.

---

## 25. Light and dark mode

Responsive behavior should remain consistent across light and dark mode.

Do not create different layout breakpoints for different themes.

Check both themes at key viewport sizes because border and surface hierarchy can affect perceived density.

The geometry should remain the same unless there is a functional reason to change it.

---

## 26. Responsive testing

At minimum, test prototypes around:

```text
375px      Common narrow mobile
640px      sm boundary
768px      md boundary
1024px     lg boundary
1280px     xl boundary
1536px     2xl boundary
```

Also test widths just before and after major breakpoints.

Do not test only exact breakpoint widths.

Resize continuously and look for the point where the content begins to fail.

Check for:

- Overflow
- Awkward wrapping
- Orphaned words
- Cramped controls
- Excessive whitespace
- Broken grids
- Hidden actions
- Unusable navigation
- Over-wide text
- Tiny touch targets

---

## 27. Content-driven breakpoints

Tailwind breakpoints are the default system, but the content still determines whether the layout works.

If a component breaks before the next breakpoint, first consider:

- A more flexible layout
- Wrapping
- Grid behavior
- Container queries
- Adjusting content width

Do not immediately add another global breakpoint.

For reusable components whose behavior depends on their container rather than the viewport, consider container queries.

---

## 28. Avoid device assumptions

Do not design around specific named devices.

Viewport dimensions vary because of:

- Browser chrome
- Split-screen modes
- Window resizing
- Foldables
- Tablets in multiple orientations
- Desktop windows that are not maximized

Design for available space and content behavior.

---

## 29. Existing systems

Before implementing responsive behavior, inspect the project for:

- Tailwind breakpoint configuration
- Existing container widths
- Shared page gutters
- Typography utilities
- Responsive navigation patterns
- Grid primitives
- Existing sheets and drawers
- Component-specific container queries

Reuse established responsive patterns.

Do not introduce a second breakpoint system into an existing product.

If the project uses standard Tailwind breakpoints, continue using them unless there is a strong system-level reason to change them.

---

## Avoid

Avoid:

- Desktop-first patching
- Device-specific breakpoints
- Using every breakpoint for every component
- Arbitrary custom breakpoints
- Keeping desktop section spacing on mobile
- Keeping 96px headings on mobile
- Shrinking all typography proportionally
- Tiny mobile body text
- Stacking every layout automatically
- Squeezing desktop tables into mobile widths
- Persistent desktop sidebars on phones
- Hover-only functionality
- Removing important content just to make it fit
- Large mobile gutters
- Excessive nested cards on small screens
- Different responsive geometry between light and dark mode without reason

---

## Final check

Before finishing a prototype, review responsive behavior.

Check that:

- The interface is mobile-first.
- Tailwind's standard `sm`, `md`, `lg`, `xl` and `2xl` breakpoints are used.
- Breakpoints are added only when the layout meaningfully changes.
- Mobile page gutters are typically around 16px.
- Section spacing reduces on smaller screens.
- Large marketing typography scales down significantly on mobile.
- Product typography preserves readability and hierarchy.
- Small component spacing remains consistent where relationships do not change.
- Grids reduce columns naturally.
- Sidebars and navigation adapt rather than simply shrink.
- Forms become appropriately linear on narrow screens.
- Touch targets remain comfortable.
- Tables use an intentional mobile strategy.
- Dialogs adapt to available space.
- Content order remains logical.
- Essential interactions do not depend on hover.
- Radius changes only when the component's relationship to the viewport changes.
- Light and dark mode retain the same responsive structure.
- The design has been checked both at and between breakpoint widths.
- There is no accidental horizontal overflow.
- The interface feels intentionally designed at mobile, tablet and desktop sizes rather than merely fitted to them.
