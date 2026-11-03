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
  border; where it says "Inter", keep the system font stack.
- **Mid-fi (Memorisely)** → every file above applies. `Placeholder` is still used for images, and `Note`
  stays available for reviewer annotations.

## Stack translations

These docs were written for a stack with shadcn/ui and Radix. This template is Vite + React + Tailwind v4
only (`03-tech-and-deploy.md`). Translate as follows, and do not add a package unless this table allows it
or the brief records an exception under "Decisions & exceptions".

| The docs say | In this template |
|---|---|
| shadcn/ui or Radix Dialog / AlertDialog | Native `<dialog>` opened with `showModal()` (gives focus trap, Escape, backdrop) |
| Accordion / Collapsible | Native `<details>` + `<summary>` |
| Tabs | Buttons with `role="tab"`, `aria-selected`, arrow-key handling, panels with `role="tabpanel"` |
| DropdownMenu / Popover | A button with `aria-expanded` toggling a positioned panel; close on Escape and outside click |
| Sheet / Drawer | `<dialog>` styled as a side or bottom panel |
| Toast / Sonner | A small `aria-live="polite"` region rendered by the app shell |
| Skeleton / Progress | Tailwind boxes (`bg-neutral-200` / `bg-slate-200`) and native `<progress>` |
| Lucide (`lucide-react`) | **Mid-fi only:** allowed; add `lucide-react` to `package.json` and note it in the brief. Lo-fi: no icon library |
| Framer Motion | Not allowed. Use Tailwind `transition-*` utilities and CSS |
| Tailwind theme config / shadcn theme variables | Tailwind v4 `@theme` and CSS variables in `src/index.css` (there is no `tailwind.config.js`) |
| Inter typeface | **Mid-fi only:** Google Fonts `<link>` in `index.html` plus `--font-sans` in `@theme` (see [text.md](text.md) "In this template"). Lo-fi: system font stack |
| Type scale tokens | Lo-fi: nearest Tailwind default sizes. Mid-fi: `--text-*` tokens in `@theme` (see [text.md](text.md)) |
| Spacing tokens (`--spacing-*`) | Tailwind's default spacing utilities already match the scale (`gap-1.5` = 6px). Do not redefine them |

## Precedence

1. The user's explicit answer in chat (record it in `project/BRIEF.md` → "Decisions & exceptions").
2. `AGENTS.md` and the numbered guidelines `01`–`08`.
3. These design-system files.

The prototype navigation system (`04`–`08`: registry, Prototype Home, flow bar) follows these rules too, but
stays grayscale at every fidelity so it reads as tooling, not product.
