# Design system — Text

> A practical typography system for designing clear, consistent interfaces with AI. Built around Inter, restrained font weights, sentence case and separate type scales for marketing and product UI.

> **When this applies:** every prototype, at every fidelity, for weights, casing, hierarchy, labels, line length and numbers. The Inter typeface and the exact pixel tokens apply only when the brief Fidelity is **Mid-fi (Memorisely)**. Lo-fi and Lo-fi+ keep the system font stack and the nearest Tailwind default sizes (`02-lofi-prototype-rules.md`). See "In this template" at the end of this file.
> Marketing typography applies only when the brief Category is **Website / landing page** (or a marketing page inside another category). Every other screen uses Product typography.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Typography should create hierarchy, improve readability and make interfaces easier to scan.

Use type deliberately. Do not create hierarchy by randomly changing font size, weight, color or casing.

The system uses **Inter** as the default typeface.

---

## 1. Typeface

Use **Inter** across marketing and product interfaces.

```css
font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
```

If Inter is already available in the project, use the existing implementation.

Do not introduce additional typefaces unless the brand or existing design system explicitly requires them.

Avoid mixing typefaces simply to make headings feel more distinctive.

---

## 2. Font weights

Keep font weight restrained.

Use primarily:

```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
```

**In this template:** do not add these variables to `src/index.css`. In Tailwind v4, `--font-*` names a font
family, so `--font-medium` turns the `font-medium` utility into a font-family and drops the weight. The built-in
utilities already have these values: `font-normal` (400), `font-medium` (500), `font-semibold` (600).

### Regular · 400

Use Regular for:

- Body copy
- Descriptions
- Supporting text
- Helper text
- Metadata
- Table content
- Longer-form content

### Medium · 500

Use Medium for:

- Marketing headings
- Product headings
- Page titles
- Section titles
- Labels
- Navigation where additional emphasis is needed
- Important UI values

Medium should be the default heading weight.

### Semibold · 600

Use Semibold sparingly.

Its primary use is:

- Buttons
- High-emphasis interactive controls where additional weight improves clarity

Do not use Semibold as the default heading weight.

### Never use

Do not use:

- Thin · 100
- Extra Light · 200
- Light · 300
- Bold · 700
- Extra Bold · 800
- Black · 900

Avoid artificially light typography for visual style.

Avoid heavy typography as a shortcut for hierarchy.

Hierarchy should primarily come from size, spacing, placement and contrast.

---

## 3. Casing

Use **sentence case** by default.

Write:

`Create new project`

Not:

`Create New Project`

Use sentence case for:

- Headings
- Buttons
- Labels
- Navigation
- Tabs
- Menu items
- Form fields
- Table headers
- Dialog titles
- Settings
- Empty states
- Calls to action

Never use ALL CAPS for interface labels.

Avoid uppercase labels such as:

`EMAIL ADDRESS`

Prefer:

`Email address`

Do not use capitalization as a visual styling technique.

### Proper nouns

Capitalize proper nouns and established product names normally.

Examples:

`Memorisely`
`Figma`
`Claude Code`
`United Kingdom`

### Acronyms

Preserve conventional acronyms where appropriate.

Examples:

`AI`
`URL`
`API`
`PDF`

---

# Marketing typography

Marketing typography can be expressive through scale while remaining restrained in weight.

Use large type to create impact rather than heavy font weights.

## Marketing scale

### Display

```css
font-size: 96px;
line-height: 1;
font-weight: 500;
letter-spacing: -0.04em;
```

Use for the primary marketing title on large desktop layouts.

Keep Display copy short.

Avoid using 96px for long multi-line headings.

### Heading 1

```css
font-size: 72px;
line-height: 1.05;
font-weight: 500;
letter-spacing: -0.035em;
```

Use for major page and campaign headings where Display is too large.

### Heading 2

```css
font-size: 56px;
line-height: 1.1;
font-weight: 500;
letter-spacing: -0.03em;
```

Use for major marketing sections.

### Heading 3

```css
font-size: 40px;
line-height: 1.15;
font-weight: 500;
letter-spacing: -0.025em;
```

Use for subsection headings and prominent content blocks.

### Heading 4

```css
font-size: 32px;
line-height: 1.2;
font-weight: 500;
letter-spacing: -0.02em;
```

Use for smaller marketing sections, cards and feature groups.

### Lead

```css
font-size: 24px;
line-height: 1.4;
font-weight: 400;
letter-spacing: -0.01em;
```

Use for introductory copy and prominent supporting text.

### Body large

```css
font-size: 20px;
line-height: 1.5;
font-weight: 400;
```

Use for marketing descriptions and larger body content.

### Body

```css
font-size: 16px;
line-height: 1.5;
font-weight: 400;
```

Use for standard marketing content.

### Small

```css
font-size: 14px;
line-height: 1.4;
font-weight: 400;
```

Use for supporting details, metadata and secondary information.

---

## Marketing responsive behavior

Large marketing typography must adapt to the viewport.

A 96px Display should not simply remain 96px on mobile.

A useful pattern is:

```text
Display
Desktop: 96px
Tablet: 72px
Mobile: 48px
```

And:

```text
Heading 1
Desktop: 72px
Tablet: 56px
Mobile: 40px
```

Keep the hierarchy intact as sizes reduce.

Do not shrink body text below readable product standards simply to fit content.

Avoid forcing large headings onto a single line when wrapping creates a better composition.

---

# Product typography

Product typography should prioritize clarity, scanning and information density.

Do not use marketing-scale typography inside application interfaces.

## Product scale

### Page title

```css
font-size: 32px;
line-height: 1.25;
font-weight: 500;
letter-spacing: -0.02em;
```

Use for the primary title of a product page.

### Heading 1

```css
font-size: 24px;
line-height: 1.3;
font-weight: 500;
letter-spacing: -0.015em;
```

Use for major sections and prominent product surfaces.

### Heading 2

```css
font-size: 20px;
line-height: 1.4;
font-weight: 500;
letter-spacing: -0.01em;
```

Use for section headings, dialogs and larger cards.

### Heading 3

```css
font-size: 16px;
line-height: 1.5;
font-weight: 500;
```

Use for card titles, grouped settings and smaller sections.

### Body

```css
font-size: 14px;
line-height: 1.5;
font-weight: 400;
```

Use as the default product body size.

### Body large

```css
font-size: 16px;
line-height: 1.5;
font-weight: 400;
```

Use when product content benefits from increased readability.

### Small

```css
font-size: 12px;
line-height: 1.4;
font-weight: 400;
```

Use for metadata, timestamps and genuinely secondary information.

Do not use 12px for important instructions or primary content.

---

## 4. Labels

Labels should be quiet, clear and readable.

Use sentence case.

Prefer:

```css
font-size: 14px;
line-height: 1.4;
font-weight: 500;
```

For compact interfaces, 12px Medium can be used where appropriate.

Do not capitalize every word.

Do not use uppercase labels.

Do not use Bold.

Do not add excessive letter spacing to labels.

Write:

`Email address`

Not:

`EMAIL ADDRESS`

Not:

`Email Address`

---

## 5. Buttons

Buttons are the main use case for Semibold.

Typical button text:

```css
font-size: 14px;
line-height: 1;
font-weight: 600;
```

Larger buttons may use 16px Semibold.

Use sentence case:

`Create account`

Not:

`Create Account`

Not:

`CREATE ACCOUNT`

Keep button labels concise and action-oriented.

Do not use Bold button text.

---

## 6. Navigation

Use Regular or Medium depending on hierarchy.

Typical navigation:

```css
font-size: 14px;
line-height: 1.4;
font-weight: 400;
```

Use Medium for active or higher-emphasis navigation where needed.

Do not rely only on font weight to indicate an active item. Combine it with an appropriate color, background or indicator.

---

## 7. Inputs

Input text should generally match body text.

Typical input:

```css
font-size: 14px;
line-height: 1.5;
font-weight: 400;
```

Labels use Medium.

Input values use Regular.

Placeholder text uses Regular with a lower-emphasis semantic foreground color.

Do not use reduced opacity as the only method of styling placeholder text if a semantic muted color exists.

---

## 8. Tables

Tables should remain readable and compact.

Use:

- 12px or 14px for dense table content
- Regular for cell values
- Medium for headers
- Sentence case for column headings

Do not use uppercase table headings.

Do not use Bold to distinguish headers.

Alignment, spacing, borders and foreground color should contribute to hierarchy.

---

## 9. Line height

Use tighter line heights for large headings and more generous line heights for body text.

As type gets larger, line height should generally become tighter.

Typical ranges:

```text
Display: 1.0
Large headings: 1.05–1.2
Product headings: 1.25–1.5
Body: 1.5
Small text: 1.4
```

Do not apply the same line-height ratio to every text style.

Avoid overly loose headings.

Avoid body text with line heights so tight that scanning becomes difficult.

---

## 10. Letter spacing

Use negative tracking selectively for large headings.

Large display typography benefits from tighter tracking because Inter naturally creates more visual space at large sizes.

Use approximately:

```text
96px: -0.04em
72px: -0.035em
56px: -0.03em
40px: -0.025em
32px: -0.02em
24px: -0.015em
20px: -0.01em
16px and below: normal
```

Do not add wide letter spacing to interface text.

Do not use tracked uppercase labels.

---

## 11. Line length

Control the width of text.

Long marketing and body copy should not span the full width of large screens.

Aim for roughly 45–75 characters per line for longer reading content.

Headings can use narrower measures to create intentional wrapping.

Do not make a paragraph wider simply because container space is available.

---

## 12. Hierarchy

Create hierarchy in this order:

1. Size
2. Position
3. Spacing
4. Color
5. Weight

Do not make every important element heavier.

A 32px Medium heading already has sufficient hierarchy over 14px Regular body text.

Avoid combinations such as oversized + bold + dark + uppercase unless there is a very specific reason.

Restraint creates a clearer system.

---

## 13. Color

Use semantic text colors from [color.md](color.md) (Mid-fi). In lo-fi, use `neutral-900` for primary content and `neutral-600` for secondary content.

Typical roles:

- `foreground` for primary content
- `muted-foreground` for secondary content
- semantic feedback colors for meaningful states
- primary or interactive colors for links and actions where appropriate

Do not create hierarchy by introducing arbitrary grey values.

Never make secondary text so faint that readability suffers.

---

## 14. Numbers and data

Use consistent typography for numbers.

For dashboards, metrics and tabular data:

- Keep weights restrained
- Use Medium for prominent metrics
- Use Regular for supporting values
- Consider tabular numerals where alignment benefits from them

```css
font-variant-numeric: tabular-nums;
```

Do not automatically make every metric Bold.

---

## 15. Existing systems

Before applying this system, inspect the existing project.

Look for:

- Existing Inter implementation
- CSS variables
- Tailwind typography utilities
- Design tokens (`@theme` in `src/index.css`)
- Shared components in `src/components/`
- Existing text components
- Existing responsive type rules

Reuse established components and tokens where they already follow the intended system.

Do not introduce a parallel typography system into an established interface.

When using Tailwind, prefer consistent utilities or shared text styles over arbitrary values repeated throughout the codebase.

---

## 16. Avoid

Avoid:

- Thin font weights
- Light font weights
- Bold font weights
- Extra Bold or Black weights
- ALL CAPS labels
- Title Case for ordinary UI labels
- Excessive font-weight changes
- Arbitrary font sizes
- Excessive letter spacing
- Tiny text for important information
- Marketing typography inside dense product UI
- Multiple typefaces without a clear brand reason
- Heavy headings simply because they are headings

---

## In this template

### Weights and casing (every fidelity)

| Use | Tailwind |
|---|---|
| Body, values, metadata | `font-normal` |
| Headings, labels, table headers | `font-medium` |
| Buttons | `font-semibold` |
| Never | `font-thin`, `font-extralight`, `font-light`, `font-bold`, `font-extrabold`, `font-black`, `uppercase` labels, `tracking-wide` labels |

### Lo-fi and Lo-fi+

Keep the system font stack (`font-sans`). Use the nearest Tailwind default size for each product style:

| Product style | Tailwind |
|---|---|
| Page title | `text-3xl font-medium` |
| Heading 1 | `text-2xl font-medium` |
| Heading 2 | `text-xl font-medium` |
| Heading 3 | `text-base font-medium` |
| Body | `text-sm` |
| Body large | `text-base` |
| Small | `text-xs` |

For marketing pages, use the responsive patterns in [responsive.md](responsive.md) §7.

### Mid-fi (Memorisely)

1. Inter is already loaded in `index.html` (the template's tooling uses it too). Do not add another font link.

2. Turn on `src/styles/memorisely.css` ([README.md](README.md) "Fidelity setup"). It already sets `--font-sans` to
   Inter and defines the product scale. Each token sets size, line height, letter spacing and weight together, so
   `text-heading-1` is the whole style:

   | Product style | Utility | Size / line height / tracking / weight |
   |---|---|---|
   | Page title | `text-page-title` | 32px / 1.25 / -0.02em / 500 |
   | Page title (mobile) | `text-page-title-sm` | 28px / 1.25 / -0.02em / 500 |
   | Heading 1 | `text-heading-1` | 24px / 1.3 / -0.015em / 500 |
   | Heading 2 | `text-heading-2` | 20px / 1.4 / -0.01em / 500 |
   | Heading 3 | `text-heading-3` | 16px / 1.5 / normal / 500 |
   | Body | `text-body` | 14px / 1.5 |
   | Body large | `text-body-lg` | 16px / 1.5 |
   | Small | `text-small` | 12px / 1.4 |

3. Use the tokens as utilities: `text-page-title`, `text-heading-1`, `text-body`, `text-small`. Do not repeat
   arbitrary values such as `text-[32px]` in screens.
   Only the page title changes on mobile (32px to 28px, [responsive.md](responsive.md) §8):
   `text-page-title-sm md:text-page-title`. The other product tokens stay the same at every breakpoint.
   Do not add `--font-<weight>` variables (see §2).
4. If the prototype has marketing pages, add the marketing styles from the scale above to the `@theme` block in
   `src/styles/memorisely.css` the same way (`--text-display`, `--text-marketing-h1`, …) and combine them with
   responsive prefixes.

---

## Final check

Before finishing an interface, review the typography.

Check that:

- Inter is used consistently (Mid-fi). Lo-fi uses the system font stack.
- Regular 400 and Medium 500 do most of the work.
- Semibold 600 is used primarily for buttons and high-emphasis controls.
- Thin, Light, Bold, Extra Bold and Black are not used.
- Headings use Medium rather than Bold.
- Labels use sentence case.
- Buttons use sentence case.
- Navigation uses sentence case.
- Table headings use sentence case.
- Marketing Display reaches 96px on appropriate desktop layouts (marketing pages only).
- Marketing typography scales down responsively (marketing pages only).
- Product typography remains appropriately compact.
- Line heights match the size and purpose of the text.
- Large headings use restrained negative letter spacing.
- Body copy has a readable line length.
- Secondary text remains accessible.
- Type hierarchy comes primarily from size, spacing and placement rather than excessive weight.
- Arbitrary type sizes and weights have not been introduced unnecessarily.
