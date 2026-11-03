# Design system — Motion

> A practical motion system for making AI-built prototypes feel responsive, calm and intentional. Motion should explain change, reinforce hierarchy and provide feedback without slowing the interface down.

> **When this applies:** only when the brief Fidelity is **Mid-fi (Memorisely)**. Ignore this file for Lo-fi and Lo-fi+ prototypes. Lo-fi prototypes use no animation; `prefers-reduced-motion` is respected either way.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Motion should help users understand what changed.

Use animation to communicate:

- State changes
- Spatial relationships
- Entry and exit
- Feedback
- Progress
- Continuity

Do not add motion simply to make an interface feel more impressive.

Product motion should usually be subtle enough that users notice the result more than the animation itself.

---

## 1. Duration scale

Use a restrained duration scale:

```css
--duration-instant: 0ms;
--duration-fast: 100ms;
--duration-default: 150ms;
--duration-moderate: 200ms;
--duration-slow: 300ms;
--duration-deliberate: 500ms;
```

**In this template:** Tailwind v4 has no duration tokens, so do not add these variables. Use the matching utilities:
`duration-0`, `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500`. The default easing is
`ease-standard` (from `src/styles/memorisely.css`). Example: `transition-colors duration-150 ease-standard`.

Most product interactions should use `100–200ms`.

Use `300ms` for larger surfaces or transitions that travel further.

Use `500ms` rarely and primarily for deliberate marketing or onboarding moments.

Do not introduce arbitrary durations for every component.

---

## 2. Duration by interaction

Typical defaults:

```text
Hover / color change        100–150ms
Button press                100ms
Focus treatment             100–150ms
Tooltip                     150ms
Dropdown / popover          150–200ms
Accordion                   200ms
Toast                       200ms
Dialog                      200ms
Sheet / drawer              200–300ms
Page-level transition       200–300ms
Marketing reveal            300–500ms
```

The larger the movement and surface, the more time it may require.

Do not make tiny controls animate slowly.

---

## 3. Easing

Use easing that feels natural and restrained.

Default UI transition:

```css
cubic-bezier(0.2, 0, 0, 1)
```

Use ease-out for elements entering the interface.

Use ease-in where appropriate for elements leaving.

Use smooth standard easing for state changes.

Avoid:

- Bounce by default
- Elastic motion
- Dramatic spring effects
- Overshoot
- Novelty easing

Springs may be appropriate for direct manipulation or highly tactile interactions, but should not become the default animation language.

---

## 4. Animate the right properties

Prefer performant properties:

```text
transform
opacity
```

Use color and background transitions for small state changes.

Avoid animating layout-heavy properties when a transform can achieve the same result.

Be cautious with:

```text
width
height
top
left
margin
padding
```

For expanding content such as accordions, use an established component implementation rather than forcing an arbitrary transform.

---

## 5. Hover

Hover should provide subtle feedback.

Typical treatments:

- Small background change
- Foreground change
- Border change
- Very subtle elevation change

Avoid translating every card upward on hover.

Avoid scaling buttons or cards aggressively.

If movement is used, keep it extremely restrained.

Example:

```css
transition: background-color 150ms, color 150ms, border-color 150ms;
```

Hover must never be required to understand or use the interface.

---

## 6. Pressed states

Pressed states should feel immediate.

Use approximately `100ms`.

A subtle scale may be used for tactile controls:

```css
transform: scale(0.98);
```

Use this sparingly.

Do not make every interactive element bounce.

For most product controls, a background or foreground state change is enough.

---

## 7. Focus

Focus transitions should be quick and clear.

Use `100–150ms`.

Do not animate focus so slowly that keyboard navigation feels delayed.

Focus visibility is more important than visual subtlety.

Use the Violet focus ring defined in [color.md](color.md).

Never remove visible focus simply because it looks cleaner.

---

## 8. Enter and exit

Elements entering the interface may combine opacity with a small positional transition.

Example:

```text
Enter:
opacity 0 → 1
translateY 4px → 0
150–200ms
```

Exit:

```text
opacity 1 → 0
translateY 0 → 2px
100–150ms
```

Keep movement distances small in product UI.

Do not fly elements across the screen unless spatial movement is important to understanding the interaction.

---

## 9. Dialogs

Dialogs should appear quickly.

Typical:

```text
Overlay fade       150–200ms
Dialog fade/scale  150–200ms
```

A restrained scale can be used:

```text
0.98 → 1
```

Do not scale dialogs from extremely small sizes.

Do not use dramatic spring entrances.

The dialog should feel immediate because it interrupts the current task.

**In this template** (native `<dialog>` with `showModal()`), animate the entrance only:

```tsx
<dialog className="m-auto rounded-xl opacity-100 transition-[opacity,scale] transition-discrete duration-200 ease-standard
  starting:scale-[0.98] starting:opacity-0 backdrop:bg-black/40 motion-reduce:transition-none">
```

Closing is instant. Do not build exit animations with timers.

---

## 10. Sheets and drawers

Sheets should communicate where they came from.

Animate from the edge they are attached to.

Example:

```text
Right sheet:
translateX(100%) → translateX(0)
200–300ms
```

Mobile bottom sheet:

```text
translateY(100%) → translateY(0)
200–300ms
```

Do not fade a spatial surface into existence when directional movement better explains its relationship to the viewport.

---

## 11. Dropdowns and popovers

Dropdowns and popovers should feel fast.

Use:

```text
150–200ms
```

Prefer opacity with a very small scale or translation.

Example:

```text
opacity 0 → 1
scale 0.98 → 1
```

Avoid large movement.

Anchor the perceived motion to the trigger where possible.

---

## 12. Tooltips

Tooltips should not animate dramatically.

Use a subtle fade or tiny movement.

Keep animation around `100–150ms`.

Do not make users wait through a long entrance animation to read a tooltip.

---

## 13. Accordions

Accordion motion should help users understand that content expands from the trigger.

Use around:

```text
200ms
```

Keep the trigger position stable where possible.

Do not add unrelated fades, rotations and scale effects simultaneously.

Chevron rotation can accompany the expansion:

```text
0deg → 180deg
```

Keep it synchronized with the content transition.

**In this template** (native `<details>` / `<summary>`): do not animate the content height. Rotate the chevron only:
`<details className="group">` … `<ChevronDown className="transition-transform duration-200 ease-standard group-open:rotate-180" />`.

---

## 14. Loading

Motion can communicate ongoing activity.

Use established patterns such as:

- Spinner
- Progress indicator
- Skeleton shimmer where appropriate

Do not animate decorative elements while the user waits.

Avoid excessive skeleton shimmer across large interfaces.

If loading is extremely short, avoid flashing a loading state unnecessarily.

---

## 15. Progress

Progress motion should reflect actual progress where possible.

Do not animate fake progress that implies certainty the system does not have.

Progress bars may transition smoothly between known values.

Keep transitions restrained and readable.

---

## 16. Success and feedback

Feedback should happen close to the user's action.

Examples:

- Button changes to loading
- Inline success message appears
- Toast enters
- Saved state updates
- Checkbox visibly changes

Use motion to reinforce the state change, not celebrate every successful action.

Avoid confetti, bouncing checkmarks or elaborate celebrations for routine product actions.

Celebratory motion is appropriate only for genuinely meaningful milestones.

---

## 17. Lists and reordering

When items are inserted, removed or reordered, motion can preserve spatial understanding.

Use short transitions that show where an item moved.

Do not animate every list render.

For direct manipulation such as drag and drop, movement should closely track the user's input.

---

## 18. Page transitions

Product page transitions should generally be minimal.

Most navigation should feel immediate.

If a transition helps maintain context, use:

```text
150–300ms
```

Prefer subtle opacity or directional continuity.

Do not add cinematic page transitions to routine application navigation.

Marketing experiences can use more expressive transitions, but content should remain accessible immediately.

---

## 19. Marketing motion

Marketing can use more expressive motion than product UI.

Appropriate examples:

- Section reveals
- Product demonstrations
- Hero visual movement
- Scroll-linked storytelling where genuinely useful

Keep text readable and actions immediately available.

Do not animate every heading, card and paragraph independently.

Avoid generic staggered fade-up animations across every section.

Motion should reinforce the story or product behavior.

---

## 20. Staggering

Use stagger only when a group genuinely benefits from sequential introduction.

Keep delays small:

```text
30–60ms between items
```

Avoid long cascading sequences.

Users should not have to wait for the final item to appear.

Do not stagger routine product lists.

---

## 21. Reduced motion

Respect `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Where motion communicates important spatial information, provide an equivalent reduced-motion treatment rather than removing meaning.

Reduced motion should minimize movement, not functionality.

---

## 22. Responsive motion

Motion may need to change on touch devices and smaller screens.

Do not depend on hover.

Mobile sheets and drawers can use directional motion appropriate to their physical placement.

Avoid large parallax and scroll effects on mobile where they reduce performance or readability.

Keep interactions fast on lower-powered devices.

---

## 23. Light and dark mode

Motion behavior should remain consistent between themes.

Do not use different durations or easing simply because the theme changes.

Be cautious with animated shadows, glows and bright color transitions in dark mode.

Theme switching itself should generally happen immediately or with an extremely subtle color transition.

Do not animate every token slowly when changing theme.

---

## 24. Existing systems

Before adding motion, inspect the project for:

- Existing transition utilities
- Tailwind classes
- shadcn/ui or Radix animations
- Motion libraries
- Shared duration tokens
- Existing easing
- Reduced-motion handling

Reuse established behavior.

Do not introduce Framer Motion or any other motion library. This template allows none
(`03-tech-and-deploy.md`). If an interaction seems to need orchestration, layout animation, or gestures, simplify
the interaction instead.

---

## Avoid

Avoid:

- Animation for decoration alone
- Slow routine interactions
- Bounce and elastic easing by default
- Large scale changes
- Cards jumping upward on every hover
- Excessive hover movement
- Cinematic product page transitions
- Confetti for routine actions
- Long stagger sequences
- Motion that blocks interaction
- Hover-dependent functionality
- Ignoring reduced-motion preferences
- Adding a motion library for simple transitions
- Animating every element on screen
- Different motion systems between light and dark mode

---

## Final check

Before finishing a prototype, check that:

- Motion communicates change or feedback.
- Most product interactions complete within 100–200ms.
- Larger surfaces use approximately 200–300ms.
- Marketing motion rarely exceeds 500ms.
- Transform and opacity are preferred for movement.
- Hover effects remain subtle.
- Pressed states feel immediate.
- Dialogs and popovers appear quickly.
- Sheets move from the edge they belong to.
- Essential functionality never depends on hover.
- Loading motion communicates real system activity.
- Routine success states are not over-celebrated.
- Reduced-motion preferences are respected.
- Motion works on touch and pointer devices.
- Existing shadcn/ui, Radix and Tailwind motion patterns are reused where appropriate.
- The interface still makes complete sense with animation removed.
