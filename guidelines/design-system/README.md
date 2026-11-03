# Design system (Memorisely)

UI quality rules from the LCA design team, adapted from the Memorisely design skills so an AI builder
(Google AI Studio / Gemini) can read them as plain docs. Open a file when the task touches its topic;
you do not need to read all of them before every change.

## Which files apply

| File | Applies to | Use it when… |
|---|---|---|
| [accessibility.md](accessibility.md) | **Every prototype** | building any screen, form, dialog, or navigation |
| [interactions.md](interactions.md) | **Every prototype** | adding buttons, inputs, menus, dialogs, toggles, drag and drop |
| [system-status.md](system-status.md) | **Every prototype** | showing loading, saving, success, error, empty, or offline states |
| [progressive-disclosure.md](progressive-disclosure.md) | **Every prototype** | a screen has many options, settings, or secondary actions |
| [responsive.md](responsive.md) | **Every prototype** | laying out a screen for the breakpoints in the brief |
| [spacing.md](spacing.md) | **Every prototype** | setting padding, gaps, margins, or density |
| [text.md](text.md) | **Every prototype** (Inter and exact type tokens: Mid-fi only) | writing headings, body copy, labels, buttons, tables, or numbers |
| [color.md](color.md) | Mid-fi (Memorisely) only | choosing any color or defining tokens |
| [radius.md](radius.md) | Mid-fi (Memorisely) only | styling corners of controls, cards, dialogs |
| [icons.md](icons.md) | Mid-fi (Memorisely) only | adding icons |
| [motion.md](motion.md) | Mid-fi (Memorisely) only | adding transitions or animation |
| [light-dark-mode.md](light-dark-mode.md) | Mid-fi (Memorisely) **and** dark mode requested | theming |

The brief's **Fidelity** answer (`project/BRIEF.md`) decides the visual rules:

- **Lo-fi** / **Lo-fi+** → `02-lofi-prototype-rules.md` wins on anything visual (grayscale, no icons in screens, no
  animation, `Placeholder` boxes). The components in `src/components/ui` render grayscale from `src/styles/lofi.css`
  (Lo-fi+ adds one accent from `lofi-plus.css`). From the "every prototype" files, apply the behavior: semantics,
  keyboard, focus, labels, states, feedback, disclosure, layout, spacing, type weights and casing. Where a file says
  "Violet focus ring" or "Destructive color", the lo-fi theme already maps it to grays; where it says "Inter", keep
  the system font stack; where it shows a spinner, skeleton shimmer, or any other animation, use static text
  ("Saving…") or still gray boxes.
- **Mid-fi (Memorisely)** → every file above applies, with the values in `src/styles/memorisely.css`. `Placeholder`
  is still used for images, and `Note` stays available for reviewer annotations.

## Components (every fidelity)

This template ships **shadcn/ui** components built on **Radix** in `src/components/ui`. Build screens from them:

```tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
```

Available: `accordion`, `alert`, `alert-dialog`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`,
`dialog`, `dropdown-menu`, `empty`, `field`, `input`, `label`, `popover`, `progress`, `radio-group`, `scroll-area`,
`select`, `separator`, `sheet`, `skeleton`, `sonner` (toasts), `switch`, `table`, `tabs`, `textarea`, `toggle`,
`toggle-group`, `tooltip`.

- They already follow these rules: semantic colors, radius, focus rings, keyboard behavior, and enter animations.
  Style them through their props (`variant`, `size`) and the theme files, not by overriding their colors.
- Use Radix patterns: `asChild` to render a trigger as another element, for example
  `<Button asChild><ScreenLink to="…">…</ScreenLink></Button>`. This template does not use Base UI (`render` prop).
- Toasts: call `toast('…')` from `sonner`. The `Toaster` and `TooltipProvider` are already mounted in `src/App.tsx`.
- A state that must open directly (an open dialog, menu, or sheet) is a registered variant whose component renders
  the parent with the overlay open, for example `<AlertDialog defaultOpen>`. The gallery shows it open, inside its
  own preview.
- Need another component? Run `npx shadcn@latest add <name>`. It adds one file to `src/components/ui` and uses the
  existing theme. Do not edit the files in `src/components/ui` except to fix a bug.

## Fidelity setup (do this once, during project setup)

1. In `src/index.css`, keep exactly one fidelity theme import active: `lofi.css` (default), `lofi-plus.css`, or
   `memorisely.css`. Comment out the other two.
2. Set `fidelity` in `src/prototype/registry.ts` to the same level (`'lo-fi'`, `'lo-fi-plus'`, `'mid-fi'`), so the
   design check applies the right rules.
3. Lo-fi+: if the brief names an accent other than violet, change the five accent lines in `src/styles/lofi-plus.css`.
4. Mid-fi: Inter and `lucide-react` are already installed; `memorisely.css` makes Inter the product font. If the brief
   asks for dark mode, call `useProductTheme()` from `src/styles/theme.ts` in the product shell (see
   [light-dark-mode.md](light-dark-mode.md)).

Every fidelity gives you the same utilities, with different values:

| Role | Utilities |
|---|---|
| Page and text | `bg-background`, `text-foreground` |
| Surfaces | `bg-card` / `text-card-foreground`, `bg-popover` / `text-popover-foreground`, `bg-muted` / `text-muted-foreground`, `bg-secondary` / `text-secondary-foreground` |
| Primary action | `bg-primary`, `hover:bg-primary-hover`, `text-primary-foreground` |
| Selected / active only | `bg-accent`, `text-accent-foreground`. Neutral hover uses `hover:bg-muted`, not accent |
| Lines and focus | `border-border`, `border-input`, `outline-ring` / `ring-ring` |
| Feedback | `bg-destructive` / `text-destructive-foreground`, `text-success`, `bg-success-subtle` / `text-success-subtle-foreground` (same for `warning`, `info`). Grays in lo-fi |
| Type (Mid-fi) | `text-page-title`, `text-page-title-sm`, `text-heading-1/2/3`, `text-body`, `text-body-lg`, `text-small` |
| Motion (Mid-fi) | `ease-standard` with `duration-100/150/200/300` |

Do not add `--radius-*`, `--spacing*`, or `--font-<weight>` variables. Tailwind's defaults already match those scales.

## Shared conventions (every fidelity)

| Topic | Use |
|---|---|
| Focus ring | The components have one. For your own interactive elements: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`. Never `outline-none` without a replacement |
| Borders | A bare `border` already uses `border-border` (set in `src/styles/base.css`). Use `border-input` for form controls |
| Dialog, sheet, menu | `Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `Popover` from `@/components/ui`. Never a hand-made `fixed inset-0` overlay |

## Stack translations

These docs were written for shadcn/ui, and this template ships shadcn/ui (Radix) on Vite + React + Tailwind v4
(`03-tech-and-deploy.md`). Translate the few remaining differences as follows, and do not add a package unless this
table allows it or the brief records an exception under "Decisions & exceptions".

| The docs say | In this template |
|---|---|
| shadcn/ui component (`Button`, `Dialog`, `Tabs`, `Accordion`, `Sheet`, `Skeleton`, `Progress`…) | The same component from `@/components/ui/…`. Add a missing one with `npx shadcn@latest add <name>` |
| Toast / Sonner | `toast()` from `sonner`; the `Toaster` is already mounted |
| Lucide (`lucide-react`) | Installed. Mid-fi screens may use icons. Lo-fi and Lo-fi+ screens use text labels (the components' own small icons are fine) |
| Framer Motion / any motion library | Not allowed. Use Tailwind `transition-*`, `duration-*`, `ease-standard`, the components' built-in animations, and `starting:` utilities. If an interaction needs more, simplify it |
| Tailwind theme config / shadcn theme variables / `next-themes` | `src/styles/base.css` + one fidelity file (`lofi.css`, `lofi-plus.css`, `memorisely.css`) and `src/styles/theme.ts` (dark mode). There is no `tailwind.config.js` |
| Inter typeface | **Mid-fi only:** already loaded in `index.html`; `--font-sans` is in `memorisely.css`. Lo-fi: system font stack |
| Type scale tokens | Lo-fi: nearest Tailwind default sizes. Mid-fi: `text-page-title`, `text-heading-1`… from `memorisely.css` (see [text.md](text.md)) |
| Spacing tokens (`--spacing-*`) | Tailwind's default spacing utilities already match the scale (`gap-1.5` = 6px). Do not redefine them |
| Radius tokens (`--radius`) | Tailwind's default radius utilities already match the scale (see [radius.md](radius.md) §19). `--radius` itself is only used by toasts |
| Duration tokens (`--duration-*`) | Tailwind has no duration tokens. Use `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500` |

## Precedence

1. The user's explicit answer in chat (record it in `project/BRIEF.md` → "Decisions & exceptions").
2. `AGENTS.md` and the numbered guidelines `01`–`08`.
3. These design-system files.

These rules apply to product screens. Prototype Home and the flow bar are tooling: they use the LowCode Agency
brand (`src/prototype/tooling.css`) at every fidelity, so they never look like part of the product.

The design check (development only, on Prototype Home and in the flow bar) flags the most common breaks of these
rules in `src/screens/` and `src/components/`, with the class to use instead. It does not catch everything: still
follow the files above.
