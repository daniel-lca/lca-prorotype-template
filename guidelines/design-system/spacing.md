# Design system — Spacing

> **When this applies:** every prototype, at every fidelity. The scale below is the Tailwind default spacing scale, so no tokens need to be added. See "Spacing tokens".
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

Use spacing deliberately to create hierarchy, relationships, rhythm and density across the interface.

Spacing should feel systematic rather than individually designed for every component.

## Base system

Use a 4px base spacing system.

The primary spacing scale is:

`0px` · `2px` · `4px` · `6px` · `8px` · `10px` · `12px` · `16px` · `20px` · `24px` · `32px` · `40px` · `48px` · `64px` · `80px` · `96px`

Use multiples of 4px for most spacing decisions.

Use `2px`, `6px` and `10px` as intentional intermediate values for smaller UI relationships where the standard 4px scale does not provide enough control.

Do not treat intermediate values as exceptions that should be avoided. They are part of the system.

Use `0px` intentionally when elements do not require separation.

## Spacing tokens

When defining tokens or variables, use a consistent scale:

```css
--spacing-0: 0px;
--spacing-0-5: 2px;
--spacing-1: 4px;
--spacing-1-5: 6px;
--spacing-2: 8px;
--spacing-2-5: 10px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

If the project already has spacing tokens, Tailwind utilities or design-system variables, use the existing system instead of creating a competing one.

**In this template:** Tailwind v4's default spacing scale is already this system (`--spacing: 0.25rem`, so each step is 4px). Do not add `--spacing-*` tokens to `@theme`. Use the utility with the same number as the token name:

| Token | Tailwind | Value |
|---|---|---|
| `--spacing-0` | `gap-0`, `p-0` | 0px |
| `--spacing-0-5` | `gap-0.5`, `p-0.5` | 2px |
| `--spacing-1` | `gap-1`, `p-1` | 4px |
| `--spacing-1-5` | `gap-1.5`, `p-1.5` | 6px |
| `--spacing-2` | `gap-2`, `p-2` | 8px |
| `--spacing-2-5` | `gap-2.5`, `p-2.5` | 10px |
| `--spacing-3` | `gap-3`, `p-3` | 12px |
| `--spacing-4` … `--spacing-24` | `gap-4` … `gap-24` | 16px … 96px |

Avoid arbitrary values such as `p-[22px]`.

## Think in relationships

Do not choose spacing values in isolation.

First determine the relationship between the elements.

**No separation: 0px**

Use when elements should visually connect or when the component itself already provides the necessary separation.

**Optical: 2–4px**

Use for subtle visual adjustments and extremely tight relationships.

Examples:
- Icon optical alignment
- Badge content
- Eyebrow and heading
- Very compact metadata

**Tight: 4–8px**

Use for elements that function as a single unit.

Examples:
- Icon and label
- Label and required indicator
- Avatar and status
- Heading and supporting metadata
- Inline actions

**Related: 8–12px**

Use between distinct elements that belong to the same content group.

Examples:
- Label and input
- Heading and description
- Card title and supporting content
- Form control and helper text
- Items inside compact component groups

**Component: 12–24px**

Use for internal component structure and padding.

Examples:
- Input horizontal padding
- Button padding
- Card padding
- Menu item padding
- Dialog content
- Form groups

**Group: 24–40px**

Use to separate related groups within a larger section.

Examples:
- Form sections
- Dashboard groups
- Groups of settings
- Card collections
- Content blocks

**Section: 40–64px**

Use to establish clear separation between major areas of a page.

**Page: 64–96px**

Use for large page-level spacing where the interface needs significant visual separation.

Do not automatically use large marketing-site spacing inside product interfaces. Application UI generally benefits from greater information density.

## Parent and child spacing

Spacing should communicate containment.

Padding defines the relationship between a container and its children.

Gap defines the relationship between siblings.

Keep these concepts separate.

For example:

```text
Card
├── 16px padding
│
├── Header
│   ├── Title
│   └── 4px
│       Description
│
├── 16px
│
└── Content
```

Do not use arbitrary margins on children to compensate for incorrect parent padding.

## Prefer gap

For flex and grid layouts, prefer `gap` over margins between individual children.

Good:

```css
display: flex;
flex-direction: column;
gap: 16px;
```

Avoid manually adding `margin-bottom` to every child.

Using `gap` keeps spacing owned by the parent and makes components easier to reorder, remove and reuse.

Use margins when spacing genuinely belongs to an individual element rather than the relationship between siblings.

## Component spacing

Components should establish predictable internal spacing.

### Buttons

Keep icon and text spacing tight.

Typically use:

`6px` or `8px`

Button padding should reflect button size rather than being independently chosen for every button.

Avoid oversized horizontal padding that makes controls unnecessarily wide.

### Inputs

Keep labels close enough to clearly belong to their control.

Typically:

`6px` or `8px` between label and input.

Use:

`4px` to `6px` between the input and helper or error text.

### Cards

Use consistent padding across cards at the same hierarchy.

Common product UI values:

`16px` · `20px` · `24px`

Do not vary card padding simply to make individual layouts fit.

### Icons

Use small gaps between icons and their labels:

`6px` or `8px`

For compact UI, `4px` may be appropriate.

Avoid large gaps that make the icon appear disconnected from its label.

### Forms

A form needs multiple levels of spacing.

For example:

```text
Label
  ↓ 6px
Input
  ↓ 4px
Helper text

      ↓ 20–24px

Next field
```

Spacing between fields should be greater than spacing within a field.

This distinction is important for making forms easy to scan.

### Lists and menus

Use consistent vertical spacing based on density.

Compact menus may use smaller internal spacing than content-heavy lists.

Do not increase spacing simply because there are fewer items.

## Nested spacing

Spacing should normally increase as hierarchy increases.

For example:

```text
Icon ↔ Label               6px
Title ↕ Description         8px
Content within card        16px
Between cards              24px
Between sections           48px
```

This creates visual hierarchy without relying on borders, backgrounds or dividers.

Before adding visual decoration to separate content, check whether spacing alone can establish the hierarchy.

## Density

Match spacing to the type of interface.

### Compact

Use for data-heavy tools, tables, dashboards and professional applications.

Bias toward:

`4px` · `6px` · `8px` · `12px` · `16px`

### Default

Use for most product interfaces.

Bias toward:

`8px` · `12px` · `16px` · `20px` · `24px` · `32px`

### Spacious

Use selectively for onboarding, simple workflows, empty states and marketing-oriented experiences.

Bias toward:

`16px` · `24px` · `32px` · `48px` · `64px`

Do not make every interface spacious by default.

Density should reflect the amount of information and frequency of use.

## Responsive spacing

Spacing may reduce as the viewport becomes smaller.

For example:

```text
Desktop section padding: 64px
Tablet section padding: 48px
Mobile section padding: 32px
```

Or:

```text
Desktop page gutter: 32px
Tablet page gutter: 24px
Mobile page gutter: 16px
```

Do not proportionally scale every spacing value.

Component-level relationships such as icon-to-label gaps often remain unchanged across breakpoints.

Reduce page and section spacing before reducing small internal component spacing.

## Alignment

Spacing and alignment should work together.

Elements that share a visual edge should align to the same grid.

Do not use additional spacing to fix an alignment problem.

Before changing padding or margins, check:

1. Is the container aligned correctly?
2. Are the children using the correct layout?
3. Is the gap correct?
4. Is the issue actually optical rather than structural?

Use small values such as `2px` only for genuine optical correction, not to compensate for incorrect layout.

## Avoid unnecessary containers

Do not place every group of content inside a card.

Use whitespace and spacing to establish hierarchy first.

Prefer:

```text
Section title

24px

Content
```

over introducing a background, border, radius and shadow solely to create separation.

Containers should communicate meaningful grouping or interaction.

## Avoid arbitrary values

Do not introduce a new spacing value when an existing value produces an equivalent result.

Before using an arbitrary value, check the spacing scale.

Prefer:

`12px`

over:

`13px`

Prefer:

`24px`

over:

`22px`

However, do not mechanically round values if doing so noticeably harms alignment or component geometry.

The spacing system is a tool for consistency, not a restriction that overrides good design.

## Existing systems

When working inside an existing product, inspect the existing spacing system before making changes.

Reuse:

- Existing CSS variables
- Tailwind spacing utilities
- Component primitives
- Design tokens
- Existing component padding
- Existing layout gaps

Do not introduce a second spacing system into an established interface.

When reusing shared components from `src/components/`, preserve their spacing conventions unless there is a clear reason to modify them.

Prefer changing shared component variants or tokens over repeatedly overriding spacing at individual instances.

## Consistency

The same relationship should generally use the same spacing.

If cards use `24px` padding, continue using `24px` for equivalent cards.

If icon-label combinations use `8px`, do not randomly switch between `6px`, `8px` and `10px`.

Intermediate values exist to solve specific relationship and density needs, not to create arbitrary variation.

## Final check

Before finishing an interface, review the spacing.

Check that:

- Spacing primarily follows the 4px system.
- `0px`, `2px`, `6px` and `10px` are used intentionally.
- Related elements are closer together than unrelated elements.
- Parent padding is consistent.
- Sibling spacing uses `gap` where appropriate.
- Equivalent components use equivalent spacing.
- Form fields have clear internal and external spacing hierarchy.
- Page gutters are consistent.
- Section spacing reflects hierarchy.
- Responsive spacing adapts appropriately.
- Arbitrary values have not been introduced unnecessarily.
- Spacing is doing the work before borders, cards and dividers are added.
- The interface is not unnecessarily spacious.
