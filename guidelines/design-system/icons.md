# Design system — Icons

> A practical icon system for designing clear, consistent interfaces with AI. Use Lucide icons with restrained sizing, consistent stroke weight and semantic colors that work across light and dark mode.

> **When this applies:** only when the brief Fidelity is **Mid-fi (Memorisely)**. Ignore this file for Lo-fi and Lo-fi+ prototypes. In lo-fi, icons stay gray placeholder shapes or text labels.
> Stack translations (shadcn/ui, Radix, Lucide, Sonner) and precedence rules: see [README.md](README.md).

## Purpose

Icons should improve recognition and support actions, not decorate the interface.

Use icons consistently. Do not mix icon families, invent icon styles or add icons simply because space is available.

---

## 1. Icon library

Use **Lucide** as the default icon library.

When working in React, prefer `lucide-react`.

```tsx
import { Search, Plus, Settings } from "lucide-react"
```

Use the existing Lucide implementation if the project already has one.

Do not mix Lucide with Heroicons, Material Symbols, Font Awesome or other icon libraries within the same interface.

Do not use emoji as interface icons.

Do not draw custom SVG icons when an appropriate Lucide icon already exists.

---

## 2. Icon sizes

Use a restrained icon size scale:

```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
--icon-2xl: 48px;
```

### 12px

Use rarely for very dense supporting UI.

Examples:

- Tiny status indicators
- Compact metadata
- Very small secondary controls

Do not use 12px for primary actions.

### 16px

The default size for compact product UI.

Examples:

- Buttons
- Inputs
- Menu items
- Table actions
- Tabs
- Breadcrumbs
- Inline actions

### 20px

Use for standard controls that need slightly more presence.

Examples:

- Navigation
- Standalone controls
- Medium buttons
- Form affordances
- Toolbar actions

### 24px

Use for prominent interface actions.

Examples:

- Mobile navigation
- Larger standalone controls
- Dialog actions
- Feature icons where the icon itself needs emphasis

### 32px

Use sparingly for feature or empty-state illustrations.

### 48px

Use only for large empty states, onboarding or marketing moments.

Do not arbitrarily use 18px, 22px, 26px or other one-off icon sizes unless an existing component system requires them.

---

## 3. Default sizing

For most product interfaces:

```text
Button icon          16px
Input icon           16px
Menu icon            16px
Table action         16px
Navigation icon      20px
Icon-only button     16–20px
Mobile navigation    24px
Empty state          32–48px
```

Do not make icons larger simply to create visual interest.

---

## 4. Stroke width

Use Lucide's default visual language.

Prefer:

```tsx
strokeWidth={2}
```

Use a consistent stroke width across equivalent icons.

Do not mix thin and heavy icons in the same interface.

Avoid increasing stroke width to make an icon feel more important. Use size, color, background or placement instead.

---

## 5. Icon color

Icons should rarely be fully dark by default.

In light mode, avoid using Slate 950 or Black for every icon.

Use semantic color hierarchy.

Typical light-mode roles:

```text
Primary/high-emphasis icon    Slate 700
Secondary/default icon        Slate 500
Muted icon                    Slate 400
Disabled icon                 Slate 300
Brand/active icon             Violet 600
Success icon                  Success 600
Warning icon                  Warning 600
Destructive icon              Destructive 600
Info icon                     Info 600
```

Use darker icon colors only when the icon genuinely requires strong emphasis.

Icons should generally feel slightly quieter than adjacent primary text.

Do not hard-code icon colors when semantic tokens exist.

---

## 6. Dark-mode icon color

Do not simply invert icon colors.

Typical dark-mode roles:

```text
Primary/high-emphasis icon    Slate 200
Secondary/default icon        Slate 400
Muted icon                    Slate 500
Disabled icon                 Slate 600
Brand/active icon             Violet 400
Success icon                  Success 500
Warning icon                  Warning 500
Destructive icon              Destructive 500
Info icon                     Info 500
```

Avoid pure white icons unless maximum emphasis is genuinely required.

Feedback and brand colors may need lighter values in dark mode to remain visible without appearing luminous.

---

## 7. Icon and text

When an icon appears beside text, the icon supports the label.

Use:

```text
4px  very compact UI
6px  default compact relationship
8px  standard relationship
```

Prefer `6px` or `8px` for most icon-label combinations.

Example:

```tsx
<button className="inline-flex items-center gap-2">
  <Plus className="size-4" />
  Add member
</button>
```

Do not use large gaps that visually disconnect the icon from its label.

Align icons optically with text rather than mechanically forcing every icon to the same baseline.

---

## 8. Icon-only buttons

Use icon-only buttons only when the action is familiar or space genuinely requires it.

Common examples:

- Close
- Search
- More
- Previous
- Next
- Settings
- Delete within an established action context

Provide an accessible label.

```tsx
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

<Button size="icon" variant="ghost" aria-label="Close">
  <X />
</Button>
```

`Button` comes from `src/components/ui` (shadcn/ui); it sizes the icon and adds the focus ring.

If an action may be ambiguous, use an icon with a text label instead.

Do not make unfamiliar actions icon-only.

---

## 9. Icon containers

Do not automatically place icons inside circles, squares or colored tiles.

Use a container only when it communicates:

- A button or interactive target
- A selected state
- A feature category
- Status
- Strong visual grouping
- A deliberate marketing treatment

For ordinary navigation, labels and inline content, use the icon directly.

Avoid the generic AI pattern of placing every feature icon inside a rounded colored square.

---

## 10. Buttons

Buttons commonly use 16px icons.

Use `6px` or `8px` between icon and label.

The icon should inherit the button foreground color.

Do not give the icon a separate decorative color inside a standard button.

For trailing icons such as arrows or chevrons, keep the icon visually subordinate to the action label.

---

## 11. Navigation

Use one icon style and size across navigation at the same hierarchy.

Typical:

```text
Sidebar navigation: 20px
Compact navigation: 16px
Mobile navigation: 24px
```

Active navigation may use the brand semantic color or active foreground.

Inactive navigation icons should normally use a secondary foreground rather than the darkest available color.

Do not make active icons larger than inactive icons.

---

## 12. Forms

Use icons in form controls only when they improve comprehension or interaction.

Appropriate examples:

- Search
- Calendar
- Show/hide password
- Clear
- Upload
- Select chevron

Avoid adding decorative icons to every input.

Input icons should generally use a muted or secondary foreground.

Errors should combine icon, color and text where useful. Never rely on a red icon alone.

---

## 13. Status icons

Status icons should use semantic colors consistently.

Examples:

- `CircleCheck` for success
- `TriangleAlert` for warning
- `CircleAlert` for errors
- `Info` for information

Do not use different icons for the same state across the product.

Do not rely on icon shape or color alone when the status is important. Include a label or supporting message.

---

## 14. Directional icons

Use directional icons consistently.

Typical Lucide choices:

- `ChevronRight` for navigation into another view
- `ChevronDown` for disclosure or dropdown
- `ArrowRight` for directional actions
- `ExternalLink` for leaving the current context when useful
- `ArrowLeft` for back navigation

Do not randomly interchange arrows and chevrons when they communicate different interaction models.

---

## 15. Destructive actions

Use destructive icon color only when the action itself is destructive.

Examples:

- Delete
- Remove
- Disconnect

Do not make a neutral close, cancel or dismiss icon red.

In menus, a destructive action can use the destructive foreground consistently across icon and label.

---

## 16. Marketing icons

Marketing interfaces may use larger icons than product UI, but retain the same Lucide visual language.

Typical sizes:

```text
Small feature icon    20–24px
Feature icon          24–32px
Large feature moment  32–48px
```

Do not use oversized icons as filler.

Do not add icons to every heading or paragraph.

---

## 17. Accessibility

Icons that communicate meaning must remain understandable.

For icon-only actions:

- Add an accessible name
- Maintain an adequate touch/click target
- Provide visible focus
- Do not rely on color alone

The visual icon may be 16px while the interactive target is 32–40px or larger.

On touch interfaces, aim for approximately 44px minimum interactive targets where practical.

Decorative icons should be hidden from assistive technology when appropriate.

---

## 18. Existing systems

Before adding icons, inspect the project for:

- Existing Lucide imports
- Shared icon components
- Standard icon sizes
- Button variants
- Semantic foreground tokens
- Navigation patterns

Reuse existing patterns.

Do not introduce a second icon sizing or color system into an established interface.

---

## Avoid

Avoid:

- Mixing icon libraries
- Emoji as UI icons
- Custom SVGs when Lucide provides an appropriate icon
- Fully black icons throughout light mode
- Pure white icons throughout dark mode
- Random icon sizes
- Mixed stroke weights
- Decorative icons everywhere
- Every icon inside a colored rounded square
- Unfamiliar icon-only actions
- Oversized icons in dense product UI
- Using feedback colors decoratively

---

## Final check

Before finishing an interface, check that:

- Lucide is used consistently.
- Equivalent icons use equivalent sizes.
- 16px and 20px do most of the work in product UI.
- Stroke width is consistent.
- Icons are not unnecessarily dark.
- Light and dark mode icon colors use the appropriate hierarchy.
- Icon-label gaps are typically 6px or 8px.
- Icon-only actions have accessible labels.
- Interactive targets are larger than the icon itself.
- Containers are only used around icons when they serve a purpose.
- Feedback icons use semantic colors consistently.
- Icons support comprehension rather than decoration.
