# Design system — Interactions

> A practical interaction system for making AI-built prototypes behave like real products. Define every important state, provide immediate feedback and use familiar interaction patterns across pointer, keyboard and touch input.

> **When this applies:** every prototype, at every fidelity. In lo-fi, apply the behavior and structure rules; colors, radius and icon specifics give way to `02-lofi-prototype-rules.md`.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

A prototype should demonstrate how the product behaves, not only how it looks.

Interactive elements must communicate:

- What can be interacted with
- What is currently happening
- What changed
- What is selected
- What is unavailable
- What the user can do next

Design the complete interaction, not only the default state.

---

## 1. Required states

For every interactive component, consider:

```text
Default
Hover
Focus
Pressed / active
Selected
Disabled
Loading
Error
Success
```

Not every component needs every state, but every relevant state must be intentionally designed.

Do not stop after styling `default` and `hover`.

---

## 2. Default state

The default state should clearly communicate affordance without excessive decoration.

Buttons should look actionable.

Inputs should look editable.

Links should be distinguishable where context requires it.

Navigation should make destinations understandable.

Do not rely on hover to reveal that something is interactive.

---

## 3. Hover

Hover is supplementary feedback for pointer devices.

Use subtle changes in:

- Background
- Foreground
- Border
- Elevation where appropriate

Do not make hover the only way to reveal:

- Important actions
- Essential labels
- Critical information
- Navigation

Touch devices do not have reliable hover.

---

## 4. Focus

Keyboard focus must always be visible.

Use one consistent focus treatment (Violet ring in Mid-fi, `neutral-900` ring in lo-fi).

Prefer `:focus-visible` so pointer interactions do not unnecessarily show keyboard focus styling.

Example (Tailwind, this template):

```tsx
// Mid-fi
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
// Lo-fi and Lo-fi+
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
```

Ensure the focus treatment remains visible against both light and dark backgrounds.

Do not remove focus outlines without providing an equally clear replacement.

---

## 5. Pressed and active

Pressed states should confirm direct interaction immediately.

A button may use:

- Slightly stronger background
- Slightly darker or lighter foreground
- Restrained scale where appropriate

Do not make the pressed state visually identical to hover.

Keep feedback immediate.

---

## 6. Selected

Selected is persistent state, not temporary press feedback.

Examples:

- Active tab
- Selected navigation item
- Chosen filter
- Selected card
- Checked option

Use a consistent combination of:

- Background
- Foreground
- Border
- Icon
- Indicator

Do not rely on color alone.

Do not make selected items larger than equivalent unselected items.

---

## 7. Disabled

Disabled controls should appear unavailable but remain readable.

A disabled state should:

- Reduce emphasis
- Remove hover behavior
- Prevent interaction
- Preserve enough contrast to understand the control

Do not make disabled text almost invisible.

Do not show a pointer cursor on disabled controls.

Do not use disabled state when the user would benefit more from understanding why an action is unavailable.

Where useful, explain the requirement instead.

---

## 8. Loading

When an action takes time, show feedback immediately.

For buttons:

```text
Idle:       Save changes
Loading:    spinner + Saving…
Success:    Saved or return to idle
```

Prevent duplicate submission while the action is processing.

Keep button width stable where practical so labels do not cause distracting layout shifts.

Do not leave users wondering whether their action registered.

---

## 9. Optimistic interactions

Use optimistic updates when:

- The action is low risk
- Failure is uncommon
- Reversal is possible
- Immediate feedback meaningfully improves the experience

Examples:

- Favoriting
- Toggling a preference
- Reordering
- Simple status changes

Do not optimistically confirm destructive or high-risk actions where failure would create confusion.

Provide rollback or error feedback when an optimistic update fails.

---

## 10. Error states

Errors should explain:

- What happened
- Where the problem is
- How to recover

For forms, place errors near the relevant field.

Use the Destructive color from [color.md](color.md) (Mid-fi) with text and, where useful, an icon. In lo-fi, use text plus a heavier border.

Do not rely on a red border alone.

Preserve the user's entered data after validation errors.

Move focus or provide an error summary when appropriate for long forms.

---

## 11. Success states

Success feedback should match the importance of the action.

Routine actions may need only:

- Inline confirmation
- Updated state
- Toast
- Button state change

Do not show a modal for every successful action.

Do not interrupt users simply to announce that a routine save succeeded.

---

## 12. Buttons

Use familiar button hierarchy.

Typical variants:

```text
Primary
Secondary
Outline
Ghost
Destructive
Link
```

Use one clear primary action within a local decision area where possible.

Do not place multiple equally prominent primary buttons beside each other without a reason.

Button labels should describe the action:

`Create project`

Not:

`Submit`

Use sentence case.

Use Semibold for button labels as defined in [text.md](text.md).

---

## 13. Icon buttons

Use icon-only buttons for familiar actions.

Always provide an accessible name.

Keep the visual icon smaller than the interactive target.

Example:

```text
Icon:       16px
Target:     32–40px desktop
Touch:      ~44px where practical
```

Use Lucide icons.

If the action is ambiguous, include a text label.

---

## 14. Links

Use links for navigation.

Use buttons for actions.

Do not style an action as a link simply because it should look visually quiet.

Links should have understandable hover and focus states.

For links embedded in body copy, ensure they are distinguishable from surrounding text.

---

## 15. Forms

Forms should respond clearly to input.

Design:

- Empty
- Filled
- Hover
- Focus
- Disabled
- Read-only
- Error
- Success where relevant

Keep labels visible.

Do not use placeholder text as the only label.

Validate at a useful moment.

Do not show errors before the user has had a reasonable opportunity to complete the field.

---

## 16. Checkboxes and radios

Use checkboxes for multiple independent selections.

Use radio buttons for one choice from a visible set.

Use switches for settings that take effect as an on/off state.

Do not use a switch as a replacement for every checkbox.

The label should be clickable.

Selected state should be visually clear beyond color alone.

---

## 17. Switches

Use switches when the interaction represents an immediate binary setting.

Examples:

- Notifications on/off
- Dark mode on/off where only two options exist
- Feature enabled/disabled

Do not use a switch for an action that requires a separate Save step unless the interaction model clearly communicates that behavior.

---

## 18. Tabs

Use tabs to switch between peer views within the same context.

The active tab must be obvious.

Do not use tabs as a substitute for sequential steps.

Do not create horizontally overflowing tab bars without an intentional mobile strategy.

Keyboard interaction should follow established tab behavior.

---

## 19. Dropdowns and menus

Use menus for collections of actions.

Use selects or comboboxes for choosing values.

Do not use an action menu as a form select.

Menu items should:

- Have clear labels
- Use consistent icons where icons add value
- Group related actions
- Separate destructive actions where useful

Use destructive styling only for genuinely destructive actions.

---

## 20. Dialogs

Use dialogs for focused decisions or tasks that should temporarily interrupt the current context.

A dialog needs:

- Clear title
- Necessary supporting context
- Primary action
- Secondary/cancel action where needed
- Close behavior
- Keyboard focus management

Do not put large multi-step workflows into small dialogs.

Do not use dialogs for information that could appear inline without interruption.

---

## 21. Destructive confirmation

Require confirmation when an action is difficult or impossible to reverse.

Confirmation should name the action clearly.

Prefer:

`Delete project`

over:

`Are you sure?`

Explain the consequence when it is meaningful.

For extremely destructive actions, stronger confirmation may be appropriate.

Do not add confirmation dialogs to easily reversible routine actions.

---

## 22. Sheets and drawers

Use sheets for secondary tasks that benefit from retaining the current context.

Examples:

- Filters
- Detail views
- Mobile navigation
- Editing supporting information

Do not use a sheet when the task deserves a full page.

On mobile, sheets may replace desktop popovers or side panels where space requires it.

---

## 23. Tooltips

Use tooltips for short supplementary explanation.

Do not put essential information exclusively inside a tooltip.

Tooltips should be available to keyboard users.

Do not add tooltips to obvious text-labelled controls.

---

## 24. Toasts

Use toasts for transient feedback that does not require immediate action.

Good examples:

- Changes saved
- Link copied
- Item archived

Do not use toasts for validation errors that belong next to a form field.

Do not make users rely on a disappearing toast for critical information.

Keep toast copy concise.

---

## 25. Empty states

An empty state should explain what the user is seeing and, when appropriate, what to do next.

Include:

- Clear title
- Short explanation
- Relevant primary action

Do not add unnecessary illustration, icon containers or decorative copy by default.

Differentiate:

- First-use empty state
- No search results
- Filtered empty state
- Error state

They require different next actions.

---

## 26. Search

Search should provide clear feedback.

Consider:

- Empty query
- Typing
- Loading
- Results
- No results
- Error
- Clear query

Do not show `No results` before a search has actually occurred.

Provide a clear control when the query is populated.

---

## 27. Filters

Make active filters visible.

Users should understand:

- Which filters are applied
- How many are applied where useful
- How to remove one
- How to clear all

On smaller screens, filters may move into a sheet.

Do not hide active filter state after the filter panel closes.

---

## 28. Pagination and load more

Choose based on the task.

Pagination is useful when:

- Position matters
- Users revisit pages
- The dataset is structured

Load more or infinite scrolling can work for exploratory feeds.

Do not use infinite scrolling for every dataset.

Preserve user position when navigating back where practical.

---

## 29. Drag and drop

Use drag and drop only when direct manipulation provides clear value.

Provide:

- Visible draggable affordance where needed
- Drag state
- Drop target
- Successful placement feedback
- Keyboard-accessible alternative where possible

Do not make drag and drop the only way to perform an important action.

---

## 30. Cursor behavior

Use cursor styles appropriately.

Clickable controls should use expected browser behavior.

Use `cursor-pointer` where a custom interactive element genuinely needs it.

Use `cursor-not-allowed` for disabled interactions where appropriate.

Do not add pointer cursors to non-interactive cards merely because they have hover styling.

---

## 31. Touch

Design touch interactions intentionally.

Aim for approximately 44px minimum targets where practical.

Maintain sufficient spacing between adjacent actions.

Do not depend on:

- Hover
- Right click
- Tiny icon targets
- Precise pointer movement

Keep common mobile actions reachable.

---

## 32. Keyboard

Interactive prototypes should support standard keyboard behavior.

Ensure:

- Logical tab order
- Visible focus
- Enter/Space activate appropriate controls
- Escape dismisses dismissible overlays
- Arrow keys work for established composite widgets where appropriate

Do not create clickable `div` elements when semantic HTML already provides the required behavior.

---

## 33. Responsive interaction patterns

Interactions may adapt across viewport sizes.

Examples:

```text
Desktop popover  → Mobile sheet
Desktop sidebar  → Mobile drawer
Inline actions   → Overflow menu when space becomes constrained
```

Do not merely shrink an interaction until it fits.

Preserve the same task and hierarchy while choosing a pattern appropriate to the available space.

---

## 34. Light and dark mode

Interaction meaning should remain consistent across themes.

Hover, focus, selected, disabled, error and success states must remain distinguishable in both light and dark mode.

Use semantic tokens from [color.md](color.md) and [light-dark-mode.md](light-dark-mode.md).

Do not hard-code separate interaction colors inside components.

---

## 35. Motion

Use [motion.md](motion.md) for transitions (Mid-fi only).

Interactions should remain understandable without animation.

Motion reinforces feedback but does not create the underlying state.

Do not delay interaction completion simply to allow an animation to finish.

---

## 36. Prototype completeness

When building a prototype, do not leave important controls visually interactive but functionally dead.

Prototype the primary path.

If a control is shown and central to the task, make it behave.

At minimum, prototype:

- Primary navigation
- Primary action
- Relevant forms
- Dialogs or sheets
- State changes
- Success feedback
- Important error or empty states

Secondary or non-essential actions may remain simplified if they are outside the purpose of the prototype.

---

## 37. Existing systems

Before implementing interactions, inspect the project for:

- shadcn/ui components
- Radix primitives
- Existing button variants
- Existing forms
- Existing dialog and sheet patterns
- Toast implementation
- Focus styles
- Loading patterns

Reuse established components.

Do not rebuild accessible primitives from scratch when shadcn/ui or Radix already provides them.

Prefer semantic HTML and established component behavior.

---

## Avoid

Avoid:

- Designing only default states
- Hover-only functionality
- Invisible keyboard focus
- Red borders as the only error signal
- Multiple competing primary actions
- Generic `Submit` labels
- Placeholder-only forms
- Dialogs for routine information
- Confirmation for easily reversible actions
- Toasts for field validation
- Icon-only controls with unclear meaning
- Tiny touch targets
- Clickable non-semantic elements
- Dead controls in the primary prototype flow
- Different interaction meaning between light and dark mode
- Animation replacing clear state design

---

## Final check

Before finishing a prototype, check that:

- Every important interactive component has the states it needs.
- Hover is supplementary rather than required.
- Keyboard focus is always visible.
- Pressed and selected states are distinct.
- Disabled states remain readable.
- Loading feedback appears immediately.
- Errors explain how to recover.
- Success feedback matches the importance of the action.
- Buttons describe their actions clearly.
- Links navigate and buttons perform actions.
- Forms keep visible labels.
- Dialogs and sheets are used for appropriate tasks.
- Destructive actions receive proportional confirmation.
- Touch targets are comfortable.
- Keyboard behavior follows familiar patterns.
- Responsive layouts use interaction patterns suited to the available space.
- Light and dark modes preserve state clarity.
- Motion reinforces interactions without slowing them down.
- The prototype's primary path actually works.
