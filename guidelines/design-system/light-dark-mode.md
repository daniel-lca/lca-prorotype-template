# Design system — Light & Dark Mode

> A practical theming system for designing intentional light and dark interfaces with AI. Built around the Memorisely Slate, Violet and feedback palettes with shared semantic roles across both themes.

> **When this applies:** only when the brief Fidelity is **Mid-fi (Memorisely)** AND the brief asks for dark mode. Otherwise build light mode only (the light values are already active in `src/styles/memorisely.css`).
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

> **In this template:**
> - The light and dark values below are already implemented in `src/styles/memorisely.css`. Do not copy them.
>   Two dark values differ on purpose: primary and destructive use the 600 shade, so white labels pass WCAG AA.
> - Dark mode is class-based (`dark` class). Call `useProductTheme()` from `src/styles/theme.ts` once in the
>   **product shell**. While the shell is mounted it puts `dark` on `<body>`, so the screen and everything the
>   components render in a portal (dialogs, sheets, menus, popovers, toasts) switch together. Prototype Home and the
>   flow bar keep their own colors. Every semantic utility switches automatically; use `dark:` only for exceptions.
>
>   ```tsx
>   useProductTheme();
>   <div className="min-h-[calc(100dvh-var(--prototype-bar-height,0px))] bg-background text-foreground">
>   ```
>
> - The choice (Light / Dark / System) is stored in localStorage (`prototype-theme`) and read before the first
>   render, so there is no flash. Put the switcher where the brief says (usually settings or the account menu): it
>   calls `setChoice('light' | 'dark' | 'system')` from `useTheme()`.

## Purpose

Light and dark mode should feel like two expressions of the same product.

Do not design light mode and then mechanically invert it.

Use the same semantic token names across both themes and remap their primitive values deliberately.

The hierarchy, brand and interaction model should remain consistent between themes.

---

## 1. Primitive palettes

Use the color primitives from [color.md](color.md).

### Slate

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

### Violet

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

### Feedback

```css
/* Success */
--success-50: #ecfdf5;
--success-100: #d1fae5;
--success-500: #10b981;
--success-600: #059669;
--success-700: #047857;

/* Warning */
--warning-50: #fffbeb;
--warning-100: #fef3c7;
--warning-500: #f59e0b;
--warning-600: #d97706;
--warning-700: #b45309;

/* Destructive */
--destructive-50: #fef2f2;
--destructive-100: #fee2e2;
--destructive-500: #ef4444;
--destructive-600: #dc2626;
--destructive-700: #b91c1c;

/* Info */
--info-50: #f0f9ff;
--info-100: #e0f2fe;
--info-500: #0ea5e9;
--info-600: #0284c7;
--info-700: #0369a1;
```

Do not invent alternative theme palettes when these values are sufficient.

---

## 2. Use semantic tokens

Components should reference semantic roles, not theme-specific primitives.

Core roles:

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

--border
--input
--ring

--destructive
--destructive-foreground
```

Add success, warning and info semantic roles where needed.

Do not write component logic such as "use Slate 900 in light mode and Slate 100 in dark mode" at every instance.

Map those values once at theme level.

---

# Light mode

## 3. Light mode foundation

Light mode should feel clean, neutral and restrained.

Use:

```css
--background: #ffffff;
--foreground: #0f172a;          /* Slate 900 */

--card: #ffffff;
--card-foreground: #0f172a;     /* Slate 900 */

--popover: #ffffff;
--popover-foreground: #0f172a;  /* Slate 900 */

--primary: #7c3aed;             /* Violet 600 */
--primary-foreground: #ffffff;

--secondary: #f1f5f9;           /* Slate 100 */
--secondary-foreground: #334155;/* Slate 700 */

--muted: #f1f5f9;               /* Slate 100 */
--muted-foreground: #64748b;    /* Slate 500 */

--accent: #f5f3ff;              /* Violet 50 */
--accent-foreground: #6d28d9;   /* Violet 700 */

--border: #e2e8f0;              /* Slate 200 */
--input: #cbd5e1;               /* Slate 300 */
--ring: #8b5cf6;                /* Violet 500 */

--destructive: #dc2626;         /* Red 600 */
--destructive-foreground: #ffffff;
```

This is the default starting point, not a reason to force every component to use a different surface.

---

## 4. Light surfaces

Prefer a restrained hierarchy:

```text
Page background      White
Primary surface      White
Muted surface        Slate 50–100
Border               Slate 200
Input boundary       Slate 300
```

Do not create many near-identical grey surfaces.

Use spacing before background changes.

Cards do not need a tinted background simply because they are cards.

---

## 5. Light text

Typical hierarchy:

```text
Primary text       Slate 900
Secondary text     Slate 600
Muted text         Slate 500
Disabled text      Slate 400
```

Do not use Black `#000000` for standard interface text.

Do not make all icons Slate 900.

Text and icons should have a clear but restrained hierarchy.

---

## 6. Light interactions

Use Violet intentionally.

Typical roles:

```text
Primary action       Violet 600
Primary hover        Violet 700
Subtle active bg     Violet 50
Subtle active text   Violet 700
Focus ring           Violet 500
```

Do not use Violet on every interactive element.

Neutral actions can remain Slate-based.

---

# Dark mode

## 7. Dark mode foundation

Dark mode should use layered Slate surfaces rather than pure Black.

Use:

```css
--background: #020617;           /* Slate 950 */
--foreground: #f1f5f9;           /* Slate 100 */

--card: #0f172a;                 /* Slate 900 */
--card-foreground: #f1f5f9;      /* Slate 100 */

--popover: #0f172a;              /* Slate 900 */
--popover-foreground: #f1f5f9;   /* Slate 100 */

--primary: #7c3aed;              /* Violet 600 (Violet 500 fails AA with white text) */
--primary-foreground: #ffffff;

--secondary: #1e293b;            /* Slate 800 */
--secondary-foreground: #e2e8f0; /* Slate 200 */

--muted: #1e293b;                /* Slate 800 */
--muted-foreground: #94a3b8;     /* Slate 400 */

--accent: #2e1065;               /* Violet 950 */
--accent-foreground: #ddd6fe;    /* Violet 200 */

--border: #1e293b;               /* Slate 800 */
--input: #334155;                /* Slate 700 */
--ring: #a78bfa;                 /* Violet 400 */

--destructive: #dc2626;          /* Red 600 (Red 500 fails AA with white text) */
--destructive-foreground: #ffffff;
```

Do not use pure Black as the default background.

Do not use pure White as the default foreground.

---

## 8. Dark surfaces

Create hierarchy through controlled layers.

Typical structure:

```text
Page background      Slate 950
Primary surface      Slate 900
Secondary surface    Slate 800
Border               Slate 800
Stronger boundary    Slate 700
```

Avoid making every card lighter than the page.

A card may use the same surface as its parent when spacing and borders already communicate containment.

Do not create a glowing dashboard aesthetic unless the product specifically requires it.

---

## 9. Dark text

Typical hierarchy:

```text
Primary text       Slate 100
Secondary text     Slate 300
Muted text         Slate 400
Disabled text      Slate 600
```

Avoid White `#ffffff` for all text.

Use White only where maximum contrast is intentionally required, such as text on a strong primary button.

Muted content must remain readable.

---

## 10. Dark interactions

Brand colors often need to become slightly lighter in dark mode.

Typical roles:

```text
Primary action       Violet 500
Primary hover        Violet 400
Subtle active bg     Violet 950
Subtle active text   Violet 200
Focus ring           Violet 400
```

Do not use bright neon Violet effects or glows.

Do not simply reuse every light-mode interactive value.

---

## 11. Feedback in light mode

Use lighter backgrounds and stronger foregrounds.

Typical pattern:

```text
Success background      Success 50
Success foreground      Success 700
Success icon            Success 600

Warning background      Warning 50
Warning foreground      Warning 700
Warning icon            Warning 600

Destructive background  Destructive 50
Destructive foreground  Destructive 700
Destructive icon        Destructive 600

Info background         Info 50
Info foreground         Info 700
Info icon               Info 600
```

---

## 12. Feedback in dark mode

Do not use the light `50` and `100` feedback surfaces directly on dark backgrounds.

Prefer restrained dark neutral surfaces with feedback color applied to icons, text, borders or subtle treatments.

Typical pattern:

```text
Success icon/text       Success 500
Warning icon/text       Warning 500
Destructive icon/text   Destructive 500
Info icon/text          Info 500
```

If a tinted dark feedback background is needed, derive it deliberately through the theme implementation rather than using a bright light-mode primitive.

Avoid luminous colored panels.

---

## 13. Borders

### Light mode

Use Slate 200 for most borders.

Use Slate 300 when a stronger input or control boundary is required.

### Dark mode

Use Slate 800 for most borders.

Use Slate 700 for stronger boundaries.

Dark-mode borders should be subtle. Do not outline every surface with bright grey.

---

## 14. Icons

Icons follow the same hierarchy as the theme.

### Light

```text
Primary icon      Slate 700
Default icon      Slate 500
Muted icon        Slate 400
Brand icon        Violet 600
```

### Dark

```text
Primary icon      Slate 200
Default icon      Slate 400
Muted icon        Slate 500
Brand icon        Violet 400
```

Do not make every icon fully dark in light mode or fully white in dark mode.

---

## 15. Shadows

Light mode can use restrained shadows where elevation genuinely matters.

Dark mode should rely more heavily on surface hierarchy and borders.

Do not increase shadow intensity in dark mode.

Avoid bright outlines, colored glows and large diffuse shadows.

---

## 16. Images and media

Do not automatically alter photographs or brand assets between themes.

Ensure surrounding surfaces provide appropriate contrast.

Logos may require approved light and dark variants.

Do not invert logos with CSS unless the asset was designed to support it.

---

## 17. Theme switching

Respect the user's theme preference where the product supports theme switching.

Support:

- Light
- Dark
- System

Avoid flashes of the wrong theme during page load.

Persist explicit user choice when appropriate.

Use the project's established theme implementation rather than creating another theme mechanism. In this
template that is `useTheme()` in `src/styles/theme.ts`.

---

## 18. Accessibility

Check contrast separately in both themes.

Do not assume a token pairing that passes in light mode also passes in dark mode.

Pay particular attention to:

- Muted text
- Placeholder text
- Borders
- Disabled controls
- Brand text
- Feedback colors
- Focus rings
- Text on primary buttons

Target WCAG AA as the baseline.

Do not communicate meaning through theme color alone.

---

## 19. Existing systems

Before applying these values, inspect the project for:

- shadcn/ui theme variables
- Tailwind theme configuration
- CSS custom properties
- Existing `.dark` theme
- Theme providers
- Component variants
- User theme preferences

Reuse the existing architecture.

When using shadcn/ui, update semantic theme variables rather than overriding every component.

Do not create separate component implementations for light and dark mode when semantic tokens can handle the change.

---

## Avoid

Avoid:

- Mechanical color inversion
- Pure Black everywhere in dark mode
- Pure White everywhere in dark mode
- Black text throughout light mode
- Bright borders in dark mode
- Neon brand colors and glows
- Colored dark-mode panels everywhere
- Separate arbitrary colors for each theme
- Hard-coded theme colors inside components
- Theme-specific component duplication
- Assuming light-mode contrast works in dark mode

---

## Final check

Before finishing both themes, check that:

- Both modes use the same semantic token architecture.
- Light mode uses White and Slate neutrals intentionally.
- Dark mode uses layered Slate 950, 900 and 800 surfaces.
- Violet remains the brand color in both themes.
- Brand colors become appropriately lighter in dark mode.
- Primary text is not Black in light mode or pure White everywhere in dark mode.
- Icons remain slightly quieter than primary text.
- Borders are subtle in both modes.
- Feedback colors communicate meaning rather than decoration.
- Dark mode is intentionally designed rather than inverted.
- Focus states remain visible.
- Contrast has been checked in both themes.
- Components consume semantic tokens rather than hard-coded theme values.
- Existing shadcn/ui and Tailwind theming conventions are preserved where appropriate.
