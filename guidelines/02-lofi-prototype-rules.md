# 02 — Lo-fi prototype rules

The prototype exists to validate **structure and flow**. Visual polish is out of scope.

These rules cover the **Lo-fi** and **Lo-fi+** fidelity levels. If the brief says **Mid-fi (Memorisely)**, the
"Visual" section below is replaced by the visual files in `guidelines/design-system/` (color, radius, icons,
motion, light/dark, and the Inter typeface and type tokens in text). Content, Behavior, Breakpoints, and Wireframe
notes still apply at every fidelity, and so do the behavior files in `guidelines/design-system/` (accessibility,
interactions, system status, progressive disclosure, responsive, spacing, and the weight, casing and hierarchy
rules in text).

## Visual

- **Grayscale only.** Use Tailwind `neutral-*` shades. The one exception: if the brief says
  "Lo-fi+", allow a single accent color for primary buttons and active states. Use the brief's accent color
  (default `violet-600`, with `violet-700` for hover).
- **System font stack** (Tailwind default `font-sans`). No custom fonts, no icon fonts.
- **Images = placeholder boxes**: a gray box with a diagonal cross or a label like `[Hero image]`.
  Use the `Placeholder` component in `src/components/Placeholder.tsx`. No stock photos, no generated images.
- **Icons**: simple gray circles/squares or text labels. Only add an icon library if the user asks.
- Borders, spacing, and hierarchy do the work: 1px `neutral-300` borders, clear headings, and whitespace that
  follows `design-system/spacing.md` (density matches the category; not every screen is spacious).
- Type follows `design-system/text.md`: Regular and Medium do most of the work, Semibold only on buttons, no Bold,
  sentence case everywhere.
- No gradients, shadows beyond `shadow-sm`, animations, or illustrations.
- Loading and saving states are static: text such as "Saving…" or gray boxes. Do not use `animate-spin`,
  `animate-pulse`, or animated spinners, even where a design-system file shows one.

## Content

- Use **realistic placeholder copy** that matches the product (real-sounding names, labels, numbers).
  Lorem ipsum is only acceptable for long body text.
- Keep mock data in `src/data/` as typed arrays, so screens stay consistent with each other.
- **Every screen shows its intended state when opened directly.** Read its content from `src/data/`. Do not
  depend on router state, query strings, or input from earlier steps. Direct links, developer shortcuts, and the
  Prototype Home gallery all open screens directly.

## Behavior

- **Every core flow must be clickable end to end.** Buttons and links in a flow must navigate.
- **Every screen is registered** in `src/prototype/registry.ts` (see `04-prototype-system.md`).
- **Link between screens by screen ID**, with `ScreenLink` or `useGoToScreen` from `src/prototype/navigation.tsx`:

  ```tsx
  <ScreenLink to="customer-booking-confirm" className="…">Confirm booking</ScreenLink>

  const goTo = useGoToScreen();
  <form onSubmit={(e) => { e.preventDefault(); goTo('customer-booking-confirm'); }}>
  ```

  Never write a route string in a screen. Screen-ID links survive route changes and keep the reviewer's current
  flow when a screen is shared between flows.
- A variant (error, empty, modal…) is its own registered screen. Open it with its ID, for example
  `goTo('customer-booking-pay-failed')`.
- Forms: fields are interactive, submit goes to the next step. No real validation beyond "required".
- Elements outside the core flows can be inert; give them `title="Not in prototype"`.
- No backend, no auth provider, no database. Fake login = a button that navigates.
- **Do not call the Gemini API or any external API** unless the brief explicitly asks for an AI feature.

## Breakpoints (from the brief)

| Brief answer | What to do |
|---|---|
| Responsive | Mobile-first. Check at 390px, 768px, 1280px. Nav collapses on mobile. |
| Desktop only | Build for 1440px wide, min width 1280px. No mobile layout. |
| Mobile only | Build at 390px. On wider screens, center the app inside a phone frame (`PhoneFrame` component). Prototype Home stays full width, outside the frame. Set `previewViewport: { width: 390, height: 844 }` in the registry so gallery previews use the phone size. |
| Mobile + desktop | Two layouts: the mobile layout below 768px (unprefixed classes) and the desktop layout from 768px up (`md:` classes). 768–1023px uses the desktop layout, so check it at 768px and 1280px. |

## Wireframe notes (optional)

When a screen needs an explanation for reviewers ("this table will be paginated", "data comes from CRM"),
use the `Note` component in `src/components/Note.tsx`. It renders a yellow sticky-note callout.
This is the only non-gray element allowed.

## Prototype tooling

Prototype Home (`/`) and the flow bar above each screen are tooling, not product. They stay grayscale at every
fidelity. Do not restyle them to match the product, and do not remove them. Reviewers can hide the flow bar with
its **Hide** button during a demo.

The flow bar sits above every screen and sets the CSS variable `--prototype-bar-height` (`0px` when hidden).
Product layouts must leave room for it:

- A full-height app shell uses `h-[calc(100dvh-var(--prototype-bar-height,0px))]` (or `min-h-[…]`), not `h-screen`.
- A sticky product header uses `sticky top-[var(--prototype-bar-height,0px)]`, not `top-0`.
