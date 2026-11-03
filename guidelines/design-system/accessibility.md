# Design system — Accessibility

> A practical accessibility system for building inclusive AI prototypes. Use semantic structure, clear focus, sufficient contrast and familiar interaction patterns across pointer, keyboard, touch and assistive technology.

> **When this applies:** every prototype, at every fidelity. In lo-fi, apply the behavior and structure rules; colors, radius and icon specifics give way to `02-lofi-prototype-rules.md`.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Accessibility is part of good interface design. Build it into the prototype from the beginning rather than treating it as a final check.

Aim for **WCAG 2.2 AA** as the baseline.

## 1. Semantic HTML

Use the correct native element whenever possible:

```html
<button>
<a>
<input>
<label>
<select>
<textarea>
<nav>
<main>
<header>
<footer>
```

Do not use clickable `div` or `span` elements when a semantic element already provides the required behavior.

Prefer native semantics first, ARIA second.

## 2. Heading hierarchy

Use headings to describe page structure:

```text
H1
  H2
    H3
```

Do not choose heading levels based on visual size. Style typography independently when needed.

## 3. Keyboard access

Every important interaction should work without a mouse.

Ensure users can:

- Navigate with Tab and Shift + Tab
- Activate controls with expected keyboard commands
- Dismiss appropriate overlays with Escape
- Navigate established composite components with expected arrow-key behavior

Keep tab order logical and never create keyboard traps.

## 4. Focus

Keyboard focus must always be visible.

Use `:focus-visible` where appropriate and use one consistent focus ring (Violet in Mid-fi, `neutral-900` in lo-fi).

Focus should remain visible in both light and dark mode.

Do not remove focus styling without an equally clear replacement.

## 5. Contrast

Use WCAG AA as the baseline:

```text
Normal text                4.5:1
Large text                 3:1
Meaningful UI boundaries   3:1 where applicable
Meaningful graphics        3:1 where applicable
```

Check contrast separately in light and dark mode.

Pay particular attention to muted text, borders, disabled states and feedback colors.

## 6. Never rely on color alone

Color should reinforce meaning, not carry it alone.

Combine color with text, icons, shape or labels.

An error should not be communicated only with a red border. Include a clear error message.

## 7. Text

Follow [text.md](text.md).

Avoid tiny important text, thin weights, excessive line lengths and ALL CAPS interface labels.

Allow text to resize without breaking the layout.

Do not prevent browser text scaling.

## 8. Links and buttons

Use meaningful labels.

Prefer:

`View pricing`

over:

`Click here`

Prefer:

`Create project`

over:

`Submit`

Use links for navigation and buttons for actions.

Icon-only buttons need an accessible name.

## 9. Forms

Every form control needs an accessible label.

Keep visible labels by default and associate labels with their controls.

Do not use placeholder text as the only label.

Communicate required fields, instructions, errors, disabled states and read-only states clearly.

Place errors close to the relevant field and preserve entered information after validation errors.

## 10. Error messages

Errors should explain what happened and how to recover.

Good:

`Enter a valid email address.`

Avoid:

`Invalid input.`

Do not rely on color alone.

## 11. Touch targets

Aim for approximately `44px` touch targets where practical.

A visual icon can remain `16px` while its interactive area is larger.

Maintain enough spacing between adjacent actions to prevent accidental activation.

## 12. Images

Provide alternative text when an image communicates meaningful content.

Decorative images should not create unnecessary noise for assistive technology.

Alt text should communicate the purpose of the image in context rather than every visual detail.

## 13. Icons

Follow [icons.md](icons.md) (Mid-fi) or gray placeholder icons (lo-fi).

Meaningful icon-only controls need an accessible name.

Decorative icons should be hidden from assistive technology where appropriate.

Do not rely on icons alone for important system status.

## 14. Dialogs

Use established accessible dialog primitives.

When a dialog opens:

- Move focus appropriately into it
- Keep keyboard focus within it while open
- Provide a clear title
- Provide a way to close it
- Return focus appropriately when it closes

Prefer shadcn/ui or Radix primitives rather than rebuilding modal behavior.

## 15. Menus, tabs and disclosure

Use established accessible patterns for tabs, menus, accordions, popovers, selects, sheets and dialogs.

Progressive disclosure controls should communicate whether content is expanded or collapsed.

Do not recreate complex keyboard behavior when established accessible primitives already exist.

## 16. System status

Important asynchronous changes should be accessible.

Examples include saving, saved, upload failed, generation complete and form errors.

Use appropriate live-region behavior where required.

Do not announce every minor visual change unnecessarily.

Follow [system-status.md](system-status.md) for visual feedback.

## 17. Motion

Respect `prefers-reduced-motion`.

Motion should never be required to understand the interface.

Avoid flashing, excessive parallax and unnecessary large movement.

Follow [motion.md](motion.md).

## 18. Responsive accessibility

Accessibility must survive responsive changes.

On smaller screens:

- Preserve access to important actions
- Maintain logical content order
- Keep touch targets comfortable
- Keep labels visible
- Avoid horizontal clipping
- Ensure zoom and text scaling remain usable

Do not simply hide functionality on mobile.

## 19. Light and dark mode

Check accessibility independently in both themes.

Pay particular attention to muted text, borders, inputs, focus rings, disabled states, feedback and brand colors.

Use the semantic tokens from [light-dark-mode.md](light-dark-mode.md) when dark mode is in scope.

## 20. Zoom and reflow

Interfaces should remain usable when users zoom or increase text size.

Layouts should reflow rather than clip important content.

Avoid fixed heights around text where wrapping may occur.

Do not hide overflow when it can cut off meaningful content.

## 21. Disabled controls

Disabled controls should remain understandable.

Do not make disabled content so faint that it becomes unreadable.

Where the reason is not obvious, explain what is required to enable the action.

## 22. Prototype accessibility

Important prototype flows should demonstrate accessible behavior, not only accessible styling.

For the primary flow, ensure:

- Keyboard navigation works
- Focus states exist
- Dialog behavior is correct
- Forms have labels
- Errors are understandable
- Loading and success states are communicated
- Responsive layouts remain usable

## 23. Existing systems

Before implementing accessibility, inspect the project for:

- shadcn/ui components
- Radix primitives
- Semantic HTML
- Existing focus styles
- Form patterns
- Existing accessibility utilities

Reuse accessible primitives.

Do not add ARIA when native HTML already communicates the correct semantics.

## Avoid

Avoid:

- Clickable `div` elements
- Missing visible focus
- Placeholder-only forms
- Color-only meaning
- Tiny touch targets
- Low-contrast muted text
- Icon-only actions without accessible names
- Incorrect heading hierarchy
- Keyboard traps
- Hover-only functionality
- Required information hidden only in tooltips
- Fixed layouts that break when text grows
- Removing focus outlines
- Excessive ARIA on semantic HTML
- Rebuilding complex accessible components unnecessarily

## Final check

Before finishing a prototype, check that:

- Semantic HTML is used wherever possible.
- Heading structure is logical.
- The primary flow works with a keyboard.
- Focus is clearly visible.
- Text and meaningful UI meet WCAG AA contrast targets.
- Color is never the only way meaning is communicated.
- Important text remains readable and resizable.
- Links and buttons have meaningful labels.
- Every form control has a label.
- Errors explain how to recover.
- Touch targets are comfortable.
- Meaningful images have useful alternative text.
- Icon-only controls have accessible names.
- Dialogs and disclosure components use established accessible primitives.
- Important asynchronous status is communicated accessibly.
- Reduced-motion preferences are respected.
- Responsive layouts preserve functionality.
- Light and dark modes are checked independently.
- The interface remains usable with zoom and increased text size.
- Accessibility is part of the prototype from the beginning.
