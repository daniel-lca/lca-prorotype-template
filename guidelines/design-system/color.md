# Design system — Color

> A practical color system for designing clear, consistent and accessible interfaces with AI. Use primitives for the palette and semantic tokens for every UI decision, with intentional light and dark mode behavior.

> **When this applies:** only when the brief Fidelity is **Mid-fi (Memorisely)**. Ignore this file for Lo-fi and Lo-fi+ prototypes.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

> **In this template:** every token below is already implemented in `src/styles/memorisely.css` (light and dark
> values, written as Tailwind palette variables). Turn it on with the "Mid-fi setup" steps in [README.md](README.md),
> then use the semantic utilities (`bg-background`, `text-foreground`, `bg-primary`, `border-border`…). Do not copy
> the CSS blocks in this file into the project, and do not create other color variables. Use palette utilities
> (`bg-slate-100`, `text-violet-700`) only where no semantic role fits.

## Purpose

Use color to communicate hierarchy, meaning, state and interaction.

Color should behave as a system. Do not choose colors independently for individual screens or components.

Build the palette in two layers:

1. **Primitive colors** define the available raw values.
2. **Semantic colors** define how those values are used in the interface.

Components should consume semantic colors wherever possible.

---

## 1. Primitive colors

Use a fixed Tailwind-style primitive palette. Do not invent alternative hex values when these primitives can be used.

The color system uses:

- **Slate** for neutral UI
- **Violet** for brand and primary interaction
- **Emerald** for success
- **Amber** for warning
- **Red** for destructive and error states
- **Sky** for informational states
- **White** and **Black** where explicitly required

### White and Black

```css
--white: #ffffff;
--black: #000000;
```

### Slate

Slate is the default neutral palette and should do most of the work across the interface.

Use the full Tailwind Slate scale:

```css
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;
--slate-950: #020617;
```

Use Slate for backgrounds, surfaces, text, icons, borders, inputs, disabled states and other neutral interface roles.

Do not introduce Grey, Zinc, Neutral or Stone alongside Slate unless the existing product already uses them.

### Violet

Violet is the brand palette.

Use the full Tailwind Violet scale:

```css
--violet-50: #f5f3ff;
--violet-100: #ede9fe;
--violet-200: #ddd6fe;
--violet-300: #c4b5fd;
--violet-400: #a78bfa;
--violet-500: #8b5cf6;
--violet-600: #7c3aed;
--violet-700: #6d28d9;
--violet-800: #5b21b6;
--violet-900: #4c1d95;
--violet-950: #2e1065;
```

Use Violet for brand expression, primary actions, active states, selected states, focus treatments and other intentional moments of emphasis.

Do not use Violet simply to make neutral UI more visually interesting.

### Success

Use Tailwind Emerald with a reduced scale:

```css
--success-50: #ecfdf5;
--success-100: #d1fae5;
--success-500: #10b981;
--success-600: #059669;
--success-700: #047857;
```

Typical roles:

- `50` subtle success background
- `100` stronger success background or hover
- `500` icon, indicator or visual accent
- `600` primary success color
- `700` stronger success text or interaction

### Warning

Use Tailwind Amber with a reduced scale:

```css
--warning-50: #fffbeb;
--warning-100: #fef3c7;
--warning-500: #f59e0b;
--warning-600: #d97706;
--warning-700: #b45309;
```

Typical roles:

- `50` subtle warning background
- `100` stronger warning background or hover
- `500` icon, indicator or visual accent
- `600` primary warning color
- `700` stronger warning text or interaction

### Destructive

Use Tailwind Red with a reduced scale:

```css
--destructive-50: #fef2f2;
--destructive-100: #fee2e2;
--destructive-500: #ef4444;
--destructive-600: #dc2626;
--destructive-700: #b91c1c;
```

Typical roles:

- `50` subtle destructive background
- `100` stronger destructive background or hover
- `500` icon, indicator or visual accent
- `600` primary destructive color
- `700` stronger destructive text or interaction

### Info

Use Tailwind Sky with a reduced scale:

```css
--info-50: #f0f9ff;
--info-100: #e0f2fe;
--info-500: #0ea5e9;
--info-600: #0284c7;
--info-700: #0369a1;
```

Typical roles:

- `50` subtle informational background
- `100` stronger informational background or hover
- `500` icon, indicator or visual accent
- `600` primary informational color
- `700` stronger informational text or interaction

### Palette rule

**Use Slate by default. Violet communicates brand and primary interaction. Success, Warning, Destructive and Info communicate meaning, never decoration.**

Feedback palettes intentionally contain fewer values than Slate and Violet. Do not generate missing shades such as `success-300` or `warning-900` unless the design system is intentionally being extended.

Components should consume semantic tokens rather than primitive values wherever possible.

---

## 2. Semantic colors

Semantic colors describe purpose rather than appearance.

Prefer:

```css
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
```

This follows the role-based approach used by modern component systems such as shadcn/ui.

Add semantic tokens only when the product genuinely requires another role.

Examples:

```css
--success
--success-foreground
--warning
--warning-foreground
--info
--info-foreground
```

Do not create semantic tokens named after their visual value, such as `--light-grey` or `--dark-blue`.

Semantic names should survive a theme change.

---

## 3. Background hierarchy

Do not make every surface a different color.

Start with a small surface hierarchy:

**Background**  
The primary page or application background.

**Card / Surface**  
Contained content that genuinely needs separation.

**Popover**  
Floating surfaces such as menus, dropdowns and popovers.

**Muted**  
Subtle backgrounds used for secondary areas, selected regions or low-emphasis content.

Use spacing before introducing additional surface colors.

Avoid wrapping every section in a tinted background or card.

---

## 4. Text hierarchy

Use color to reinforce typographic hierarchy, not replace it.

Maintain a small set of text roles.

### Primary text

Use `foreground` for:

- Page titles
- Headings
- Important values
- Primary body content
- High-emphasis labels

### Secondary text

Use `muted-foreground` for:

- Descriptions
- Supporting copy
- Metadata
- Timestamps
- Secondary labels

### Interactive text

Use an appropriate interactive semantic color for links and actions when color is needed to communicate interactivity.

Do not create five different shades of grey to manufacture hierarchy.

Hierarchy should also come from typography, spacing and position.

Never make important information low contrast simply to make the interface feel visually softer.

---

## 5. Brand color

Use brand color intentionally.

Brand color is most useful for:

- Primary actions
- Active or selected states
- Key interactive controls
- Focus or emphasis where appropriate
- Small moments of brand expression

Do not apply brand color to everything interactive.

Do not use the primary brand color as decoration across large areas unless the product's visual identity specifically requires it.

A strong interface can remain predominantly neutral while using brand color selectively.

---

## 6. Feedback colors

Use established semantic meaning consistently.

**Success**  
Completed, healthy, confirmed or positive outcomes.

**Warning**  
Requires attention but does not necessarily prevent progress.

**Destructive**  
Errors, destructive actions, failed states and critical problems.

**Informative**  
Neutral information that requires additional attention.

Do not use feedback colors decoratively.

Do not use destructive red simply to create emphasis.

Where possible, combine feedback color with:

- An icon
- A label
- Supporting text
- A clear state change

Never rely on color alone to communicate important status.

---

## 7. Borders

Borders should provide structure without dominating the interface.

Use `border` as the default structural border color. In Tailwind v4 that means `border border-border` (or
`border-input` for form controls); a bare `border` class takes the text color.

Use borders for:

- Inputs
- Cards where containment is necessary
- Dividers
- Tables
- Menus
- Component boundaries

Avoid using darker borders simply to make components feel more defined.

Prefer subtle borders with stronger contrast reserved for interactive states such as focus, error or selection.

Do not add borders where spacing or background hierarchy already communicates the relationship.

---

## 8. Inputs and controls

Inputs should use semantic component colors rather than custom colors at every instance.

Account for:

- Default
- Hover
- Focus
- Filled
- Disabled
- Error
- Read-only

The default state should not compete visually with the focus state.

Focus must be clearly visible.

Error states should not rely only on a red border. Pair them with clear error messaging and, where appropriate, an icon.

Disabled controls should appear unavailable while remaining readable.

---

## 9. Interaction states

Interactive components need deliberate color states.

At minimum consider:

- Default
- Hover
- Focus
- Pressed
- Selected
- Disabled

State changes should be noticeable without feeling dramatic.

For neutral controls, a subtle background or foreground shift is often enough.

For primary controls, adjust the existing semantic color rather than introducing an unrelated color.

Do not create hover colors ad hoc for each component.

---

## 10. Light mode

Light mode should not mean pure white everywhere.

Use a deliberate hierarchy of light surfaces.

A typical structure may use:

- A neutral page background
- Clear foreground text
- Subtle borders
- Slightly differentiated muted surfaces
- Stronger colors reserved for actions and states

Pure white is valid where appropriate, but do not use multiple near-identical whites without a clear purpose.

In this template the page background (`bg-background`) is white, as in [light-dark-mode.md](light-dark-mode.md).
Create surface hierarchy with `bg-muted` areas and `border-border`, not with extra near-white colors.

Avoid excessive shadows as a substitute for surface hierarchy.

Prefer spacing, subtle borders and controlled background differences.

---

## 11. Dark mode

Dark mode is a separate color system, not an inverted light theme.

Reassign semantic tokens for dark environments.

Do not mechanically invert primitive values.

Avoid pure black as the default for every surface unless the product specifically calls for it.

Use layered dark neutrals to preserve hierarchy between:

- Background
- Cards
- Popovers
- Inputs
- Muted surfaces

Avoid pure white for all text. Use appropriate high-contrast foreground values while allowing secondary content to recede.

Recheck brand and feedback colors in dark mode. Colors that work on white may become overly saturated, luminous or inaccessible on dark surfaces.

Borders often require lower visual contrast in dark mode.

---

## 12. Accessibility

Color choices must preserve readable contrast.

Target WCAG AA contrast as a baseline:

- **4.5:1** for normal text
- **3:1** for large text
- **3:1** for meaningful non-text UI boundaries and graphical elements where applicable

Do not assume a color is accessible because it looks readable.

Check important foreground/background combinations.

Pay particular attention to:

- Muted text
- Placeholder text
- Disabled states
- Text on brand backgrounds
- Destructive states
- Links inside body text
- Dark mode

Do not communicate meaning using color alone.

---

## 13. Opacity

Use opacity carefully.

Prefer explicit semantic colors over repeatedly applying arbitrary opacity values.

Opacity can be useful for:

- Overlays
- Scrims
- Subtle hover treatments
- Decorative effects

Avoid lowering the opacity of text as the default method for creating secondary hierarchy. This can produce unpredictable contrast across different backgrounds.

Prefer a dedicated semantic foreground color.

---

## 14. Gradients

Do not add gradients by default.

Use gradients only when they serve a clear brand, visualization or product purpose.

Avoid generic AI-generated gradients on:

- Buttons
- Cards
- Page backgrounds
- Headings
- Empty states

A simple solid semantic color is usually preferable for product UI.

---

## 15. Charts and data visualization

Do not reuse interface feedback colors indiscriminately for charts.

Chart colors should:

- Remain distinguishable
- Work across light and dark modes
- Preserve meaning across views
- Avoid implying success or error unless that meaning is intended
- Remain understandable when color perception differs

Use labels, values, patterns or other cues when color alone would make the data ambiguous.

---

## 16. Existing systems

Before introducing colors, inspect the existing project.

Look for:

- CSS variables
- Tailwind theme configuration
- Design tokens
- shadcn/ui theme variables
- Existing component variants
- Light and dark theme definitions

Reuse the existing system when one exists.

Do not introduce a parallel palette because a slightly different color looks better on one screen.

Prefer updating the shared semantic variables in `src/styles/memorisely.css` and shared components in `src/components/` rather than repeatedly overriding colors at individual instances.

---

## 17. Token usage

Prefer:

```css
color: var(--foreground);
background: var(--background);
border-color: var(--border);
```

over:

```css
color: #18181b;
background: #ffffff;
border-color: #e4e4e7;
```

And prefer semantic Tailwind utilities where the project supports them:

```html
<div class="bg-background text-foreground border-border">
```

Avoid scattering raw palette values throughout the UI.

The goal is to make theme changes possible without redesigning every component.

---

## 18. Avoid unnecessary color

Before adding a color, ask what information it communicates.

Do not use color simply because an interface feels plain.

Prefer hierarchy created through:

1. Layout
2. Spacing
3. Typography
4. Semantic surface changes
5. Color

This keeps interfaces calm, usable and easier to maintain.

---

## 19. Consistency

Equivalent roles should use equivalent colors.

If secondary text uses `muted-foreground`, continue using that token for equivalent secondary content.

If selected navigation uses `accent`, do not introduce another selected-state color elsewhere without a reason.

If destructive actions use `destructive`, use the same semantic role across dialogs, menus, buttons and alerts.

Color variation should communicate variation in meaning.

---

## Final check

Before finishing an interface, review the color system.

Check that:

- Raw colors are organized as primitives.
- Components primarily consume semantic tokens.
- Background, foreground, card, popover, muted, border and interactive roles are clearly defined.
- Brand color is used intentionally rather than everywhere.
- Feedback colors have consistent meanings.
- Text hierarchy remains readable.
- Borders are subtle and purposeful.
- Interactive states are distinguishable.
- Focus states are visible.
- Meaning is not communicated by color alone.
- Important combinations meet accessibility contrast requirements.
- Light mode has clear surface hierarchy.
- Dark mode has been intentionally designed rather than inverted.
- Existing project tokens are reused where appropriate.
- Arbitrary hex values and one-off colors have not been introduced unnecessarily.
- Gradients and decorative color are only used when they serve a purpose.
- The interface remains understandable if most of the UI is neutral.
