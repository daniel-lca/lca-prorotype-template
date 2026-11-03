# Design system — Radius

> A practical radius system for creating consistent, refined interfaces with AI. Built around a restrained scale with clear rules for controls, surfaces, nesting and shape.

> **When this applies:** only when the brief Fidelity is **Mid-fi (Memorisely)**. Ignore this file for Lo-fi and Lo-fi+ prototypes.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Border radius should communicate shape, containment and interaction without making every interface feel soft or inflated.

Use radius systematically.

Do not choose a different radius for each component.

The default product aesthetic should feel refined and moderately rounded, not pill-shaped or excessively soft.

---

## 1. Radius scale

Use the following radius scale:

```css
--radius-none: 0px;
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-full: 9999px;
```

**In this template:** these are Tailwind v4's default radius values, so add no radius variables. Use:

| Use | Value | Tailwind |
|---|---|---|
| Tiny details | 2px | `rounded-xs` |
| Compact elements, badges | 4px | `rounded-sm` |
| Buttons, inputs, icon buttons | 6px | `rounded-md` |
| Cards, popovers, menus | 8px | `rounded-lg` |
| Dialogs, sheets, large surfaces | 12px | `rounded-xl` |
| Marketing surfaces | 16px | `rounded-2xl` |
| Avatars, pills | 9999px | `rounded-full` |

Use `6px` and `8px` for most product interface components.

Use larger values intentionally rather than as the default.

Do not introduce arbitrary values such as `5px`, `7px`, `10px`, `14px`, `18px`, `20px`, `24px` or `32px` unless an existing system explicitly requires them.

---

## 2. Default hierarchy

Use radius according to component scale and purpose.

A useful default hierarchy is:

```text
No radius                 0px
Tiny details              2px
Compact elements          4px
Controls                  6px
Cards and surfaces        8px
Dialogs / large surfaces  12px
Marketing surfaces        16px
Circular / pill           Full
```

This is a starting system, not a requirement to use every value.

A product may use only `4px`, `6px`, `8px` and `12px` across most of its interface.

Fewer radius values usually create a more coherent product.

---

## 3. Controls

### Buttons

Default:

```text
Button radius: 6px
```

Use `6px` for most standard buttons.

Use `8px` where the control is larger or the product intentionally has a slightly softer visual language.

Do not make buttons pill-shaped by default.

Use `full` only when a pill shape has a clear reason, such as:

- Filter chips
- Tags
- Segmented selections
- Compact status controls
- Intentionally pill-shaped marketing actions

Do not use `full` simply because the button has rounded corners.

### Inputs

Default:

```text
Input radius: 6px
```

Apply the same radius logic to:

- Text inputs
- Textareas
- Selects
- Comboboxes
- Date controls
- Search fields

Equivalent form controls should use equivalent radius.

Do not make search inputs pill-shaped by default.

### Icon buttons

Use the same radius family as surrounding controls.

Typical:

```text
Compact icon button: 6px
Standard icon button: 6–8px
```

Use `full` only when the control is intentionally circular.

---

## 4. Cards

Default:

```text
Card radius: 8px
```

Cards should usually be only slightly more rounded than the controls they contain.

This creates a subtle hierarchy:

```text
Button / Input   6px
Card             8px
Dialog          12px
```

Do not use large 16–32px card radii throughout product interfaces.

Do not increase card radius simply because a card is visually prominent.

Hierarchy should come primarily from layout, spacing, typography and color.

---

## 5. Dialogs, sheets and popovers

### Dialogs

Default:

```text
Dialog radius: 12px
```

Dialogs are larger floating surfaces and can use a slightly larger radius than cards.

### Popovers and dropdowns

Typical:

```text
Popover radius: 8px
Dropdown radius: 8px
Menu radius: 8px
```

Keep floating surfaces visually related to cards and controls.

### Sheets and drawers

Radius depends on where the sheet enters the viewport.

For example:

```text
Right-side sheet:
top-left: 12px
bottom-left: 12px
top-right: 0px
bottom-right: 0px
```

Edges that meet the viewport do not need artificial rounding.

Do not round every corner when a surface is physically attached to an edge.

---

## 6. Nested radius rule

Nested rounded surfaces must have mathematically and visually related radii.

Use this rule:

> **Inner radius + gap = outer radius**

Where `gap` is the visible space between the inner and outer rounded edges.

Formula:

```text
inner radius + gap = outer radius
```

Therefore:

```text
inner radius = outer radius - gap
```

Example:

```text
Outer radius: 12px
Gap:           4px
Inner radius:  8px

8px + 4px = 12px
```

Another example:

```text
Outer radius: 16px
Gap:           8px
Inner radius:  8px

8px + 8px = 16px
```

This keeps nested corners visually concentric.

Do not give nested surfaces identical radii when there is visible spacing between their edges.

Bad:

```text
Outer radius: 12px
Gap:           4px
Inner radius: 12px
```

Good:

```text
Outer radius: 12px
Gap:           4px
Inner radius:  8px
```

The inner corner should visually follow the curve of the outer corner.

---

## 7. Radius and padding

When a rounded container has internal padding, consider whether a nested child's radius needs to follow the nested radius rule.

If the child touches or closely follows the container's curved edge, calculate the inner radius from the visible gap.

Example:

```text
Card radius:     16px
Card padding:     8px
Nested surface:   8px radius
```

Because:

```text
8px inner radius + 8px gap = 16px outer radius
```

If the nested element is far away from the outer corner, it does not need to mathematically mirror the outer radius.

Apply the rule where the two curves are visually related.

---

## 8. Adjacent components

When components touch, remove radius from the shared edges where appropriate.

Example:

```text
[ Input                     ][ Button ]
```

If these controls behave as one compound component, do not preserve full rounding on the touching edges.

Use radius to describe the overall shape of the group.

This applies to:

- Input + button combinations
- Segmented controls
- Button groups
- Joined filters
- Pagination groups
- Toolbars

Do not create doubled rounded corners inside a connected component.

---

## 9. Pills

Pill shapes are visually strong.

Use `radius-full` intentionally.

Appropriate examples:

- Tags
- Chips
- Badges
- Compact filters
- Status labels
- Avatars
- Small counters
- Segmented controls where the system calls for it

Avoid pill shapes for:

- Every button
- Every input
- Cards
- Dialogs
- Navigation containers
- Large content surfaces

A pill should communicate a specific component shape, not become the default aesthetic.

---

## 10. Circles

Use `radius-full` for genuinely circular elements when width and height are equal.

Examples:

- Avatars
- Status dots
- Circular icon buttons
- Small indicators

Ensure the element has equal dimensions.

```css
width: 32px;
height: 32px;
border-radius: 9999px;
```

Do not use `50%` or `full` on rectangular elements unless a pill shape is intended.

---

## 11. Images and media

Images inside rounded containers should respect the container geometry.

If an image reaches the edge of a card, it should inherit or correctly match the relevant outer corners.

Prefer:

```css
overflow: hidden;
```

on the parent where appropriate rather than manually guessing image corner values.

If the image is inset from the card edge, follow the nested radius rule where the curves visually relate.

Do not apply large radius to every image independently.

---

## 12. Tables

Tables generally need less radius than marketing surfaces.

For a table inside a bordered container:

```text
Container radius: 8px
```

The internal rows and cells usually do not need individual radius.

Only the external corners should describe the table shape.

Do not round every row.

Do not create floating pill-like cells unless the content itself is a badge or status.

---

## 13. Navigation

Navigation containers should use radius only where the navigation pattern needs containment.

Sidebar navigation items commonly use:

```text
6px
```

Selected items can use the same radius as default items.

Do not change radius between selected and unselected states.

Top-level navigation does not automatically need a rounded container.

Avoid wrapping an entire sidebar in a large rounded card unless the layout intentionally calls for it.

---

## 14. Marketing

Marketing interfaces can use slightly larger radii than product UI.

Typical:

```text
Buttons             6–8px
Cards               8–12px
Feature media       12–16px
Large visual areas  16px
```

Use `16px` selectively.

Do not automatically use 24px or 32px simply because the interface is marketing-focused.

Large surfaces should still feel structured rather than inflated.

---

## 15. Responsive behavior

Radius usually does not need to scale proportionally across breakpoints.

A button with `6px` radius can remain `6px` on desktop and mobile.

Large surfaces may reduce radius when they become edge-to-edge on smaller screens.

Example:

```text
Desktop dialog: 12px
Mobile full-screen dialog: 0px
```

If a card becomes flush with the viewport edge, remove radius from the corners that meet that edge where appropriate.

Do not reduce every radius simply because the viewport becomes smaller.

---

## 16. Light and dark mode

Radius values should normally remain identical between light and dark mode.

Do not create separate radius scales for themes.

The perception of containment may change because dark mode uses different surfaces and borders, but the geometry should remain consistent.

If a card uses `8px` in light mode, it should normally use `8px` in dark mode.

Use color, border and elevation changes to adapt the surface, not radius.

---

## 17. Radius and elevation

Do not increase radius simply because a surface is elevated.

Elevation and radius are separate properties.

A floating popover can use:

```text
8px radius
```

even when it has a shadow.

A dialog can use:

```text
12px radius
```

without needing an exaggerated 24px curve.

Avoid combining very large radius with large shadows unless the visual language explicitly requires it.

---

## 18. Radius and hierarchy

Radius should not be the primary tool for creating hierarchy.

Do not make:

```text
Small card: 8px
Important card: 16px
Very important card: 24px
```

Instead use:

- Typography
- Spacing
- Size
- Position
- Color
- Border
- Elevation

Keep equivalent component types geometrically consistent.

---

## 19. Existing systems

Before applying radius, inspect the project for:

- CSS radius variables
- Tailwind radius utilities
- shadcn/ui theme radius
- Existing component variants
- Existing button and input geometry
- Existing card and dialog geometry

Reuse the established radius system where appropriate.

Prefer changing shared components in `src/components/` rather than overriding individual component instances repeatedly.

In this template, do not add `--radius` or `--radius-*` variables. In Tailwind v4 they replace the built-in
scale (a `--radius` variable changes every bare `rounded`). Use the utilities in the §1 table.

Do not introduce a second radius system into an established interface.

---

## 20. Avoid

Avoid:

- Random radius values
- 20–32px product cards by default
- Pill-shaped buttons everywhere
- Pill-shaped inputs everywhere
- Rounded containers around every section
- Giving every nested surface the same radius
- Rounding internal table rows
- Different radius for active and inactive states
- Increasing radius to create importance
- Changing radius between light and dark mode
- Excessive rounded containers in dense interfaces
- Mixing sharp and extremely rounded components without a clear reason

---

## Final check

Before finishing an interface, review the radius system.

Check that:

- Radius uses the defined scale.
- 6px and 8px do most of the work in product UI.
- Buttons and inputs are typically 6px.
- Cards are typically 8px.
- Dialogs and large floating surfaces are typically 12px.
- 16px is used selectively for larger or marketing surfaces.
- Full radius is reserved for genuine pills and circles.
- Equivalent components use equivalent radius.
- Nested corners follow `inner radius + gap = outer radius` when their curves visually relate.
- Connected components remove unnecessary radius from shared edges.
- Radius does not change unnecessarily between responsive breakpoints.
- Light and dark mode use the same geometry.
- Radius is not being used as a substitute for hierarchy.
- Large AI-style rounded cards and containers have not been introduced unnecessarily.
