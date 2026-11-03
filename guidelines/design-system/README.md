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

- **Lo-fi** / **Lo-fi+** → `02-lofi-prototype-rules.md` wins on anything visual (grayscale, no icon library, no
  animation, `Placeholder` boxes). From the "every prototype" files, apply the behavior: semantics, keyboard,
  focus, labels, states, feedback, disclosure, layout, spacing, type weights and casing. Where a file says
  "Violet focus ring", use a `neutral-900` ring; where it says "Destructive color", use text plus a heavier
  border; where it says "Inter", keep the system font stack; where it shows a spinner, skeleton shimmer, or
  any other animation, use static text ("Saving…") or still gray boxes.
- **Mid-fi (Memorisely)** → every file above applies. `Placeholder` is still used for images, and `Note`
  stays available for reviewer annotations. Turn on the tokens first (next section).

## Mid-fi setup (do this once, during project setup)

The Memorisely tokens are already written for Tailwind v4 in `src/styles/memorisely.css`. Do not write your own.

1. In `src/index.css`, uncomment `@import './styles/memorisely.css';` (it stays directly under `@import 'tailwindcss';`).
2. In `index.html`, add the Inter `<link>` tags from [text.md](text.md) "In this template".
3. Add `lucide-react` to `package.json` dependencies (the pre-approved Mid-fi icon library).
4. If the brief asks for dark mode, use `useTheme()` from `src/styles/theme.ts` (see [light-dark-mode.md](light-dark-mode.md)).
5. Paint the product shell, not `body`: the shell root gets `bg-background text-foreground`. `body` keeps the
   template's neutral style for Prototype Home.

The file gives you these utilities (light and dark values included):

| Role | Utilities |
|---|---|
| Page and text | `bg-background`, `text-foreground` |
| Surfaces | `bg-card` / `text-card-foreground`, `bg-popover` / `text-popover-foreground`, `bg-muted` / `text-muted-foreground`, `bg-secondary` / `text-secondary-foreground` |
| Primary action | `bg-primary`, `hover:bg-primary-hover`, `text-primary-foreground` |
| Selected / active only | `bg-accent`, `text-accent-foreground`. Neutral hover uses `hover:bg-muted`, not accent |
| Lines and focus | `border-border`, `border-input`, `outline-ring` / `ring-ring` |
| Feedback | `bg-destructive` / `text-destructive-foreground`, `text-success`, `bg-success-subtle` / `text-success-subtle-foreground` (same for `warning`, `info`) |
| Type | `text-page-title`, `text-page-title-sm`, `text-heading-1/2/3`, `text-body`, `text-body-lg`, `text-small` |
| Motion | `ease-standard` with `duration-100/150/200/300` |

Do not add `--radius*`, `--spacing*`, or `--font-<weight>` variables. Tailwind's defaults already match those scales.

## Shared conventions (every fidelity)

| Topic | Use |
|---|---|
| Focus ring | `focus-visible:outline-2 focus-visible:outline-offset-2` plus `focus-visible:outline-neutral-900` (lo-fi) or `focus-visible:outline-ring` (Mid-fi). Never `outline-none` without this replacement |
| Borders | Always give a color: `border border-neutral-300` (lo-fi) or `border border-border` (Mid-fi). A bare `border` uses the text color in Tailwind v4 |
| Dialog | `<dialog className="m-auto …">` opened with `showModal()`. Tailwind's reset removes the browser's centering margin, so `m-auto` is required. Style the overlay with `backdrop:bg-black/40` (lo-fi: `backdrop:bg-neutral-900/40`) |
| Menus | Use a list of buttons inside the panel: Tab moves between items, Escape closes and returns focus to the trigger. Do not add `role="menu"` unless you also add arrow-key handling |

## Stack translations

These docs were written for a stack with shadcn/ui and Radix. This template is Vite + React + Tailwind v4
only (`03-tech-and-deploy.md`). Translate as follows, and do not add a package unless this table allows it
or the brief records an exception under "Decisions & exceptions".

| The docs say | In this template |
|---|---|
| shadcn/ui or Radix Dialog / AlertDialog | Native `<dialog className="m-auto">` opened with `showModal()` (gives focus trap, Escape, backdrop). See "Shared conventions" |
| shadcn `<Button>` / `<Input>` / `<Card>` components | Native `<button>`, `<input>`, `<div>` with Tailwind classes. There is no `@/components/ui/*`; if a pattern repeats, create a small component in `src/components/` |
| Accordion / Collapsible | Native `<details>` + `<summary>` |
| Tabs | Buttons with `role="tab"`, `aria-selected`, arrow-key handling, panels with `role="tabpanel"` |
| DropdownMenu / Popover | A button with `aria-expanded` toggling a positioned panel; close on Escape and outside click |
| Sheet / Drawer | `<dialog>` styled as a side or bottom panel |
| Toast / Sonner | A small `aria-live="polite"` region rendered by the app shell |
| Skeleton / Progress | Tailwind boxes (`bg-neutral-200` / `bg-slate-200`) and native `<progress>` |
| Lucide (`lucide-react`) | **Mid-fi only:** allowed; add `lucide-react` to `package.json` and note it in the brief. Lo-fi: no icon library |
| Framer Motion / any motion library | Not allowed. Use Tailwind `transition-*`, `duration-*`, `ease-standard`, and `starting:` utilities. If an interaction needs more, simplify it |
| Tailwind theme config / shadcn theme variables / `next-themes` | `src/styles/memorisely.css` (Mid-fi) and `src/styles/theme.ts` (dark mode). There is no `tailwind.config.js` |
| Inter typeface | **Mid-fi only:** Google Fonts `<link>` in `index.html`; `--font-sans` is in `memorisely.css`. Lo-fi: system font stack |
| Type scale tokens | Lo-fi: nearest Tailwind default sizes. Mid-fi: `text-page-title`, `text-heading-1`… from `memorisely.css` (see [text.md](text.md)) |
| Spacing tokens (`--spacing-*`) | Tailwind's default spacing utilities already match the scale (`gap-1.5` = 6px). Do not redefine them |
| Radius tokens (`--radius`) | Tailwind's default radius utilities already match the scale (see [radius.md](radius.md) §19). Do not redefine them |
| Duration tokens (`--duration-*`) | Tailwind has no duration tokens. Use `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500` |

## Precedence

1. The user's explicit answer in chat (record it in `project/BRIEF.md` → "Decisions & exceptions").
2. `AGENTS.md` and the numbered guidelines `01`–`08`.
3. These design-system files.

The prototype navigation system (`04`–`08`: registry, Prototype Home, flow bar) follows these rules too, but
stays grayscale at every fidelity so it reads as tooling, not product.
