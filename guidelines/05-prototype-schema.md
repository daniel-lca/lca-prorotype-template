# 05 — Prototype registry schema

This document defines the recommended conceptual data model.

The project may implement this model in TypeScript, JavaScript, JSON, YAML, a database, or another structured format.

The requirement is not the file format.

The requirement is that **one authoritative registry drives all prototype navigation views.**

## In this template

The registry is already implemented. Use it; do not create a second one.

| File | Role |
|---|---|
| `src/prototype/registry.ts` | **The registry.** The only file where user types, flows, screens, routes, and shortcuts are declared. |
| `src/prototype/types.ts` | TypeScript version of the model below (`UserType`, `Flow`, `Screen`, `Shortcut`). |
| `src/prototype/derive.ts` | Derived views: flows per user type, ordered screens, step numbers, prev/next, flow context, links. |
| `src/prototype/validate.ts` | The §9 validation rules, plus a check that every file in `src/screens/` is registered. |
| `src/prototype/navigation.tsx` | `ScreenLink` and `useGoToScreen`: links between screens by screen ID. |
| `src/prototype/PrototypeHome.tsx` | Prototype Home at `/`: Prototype Flows, All Prototype Screens (visual gallery), Developer shortcuts, registry issues. |
| `src/prototype/ScreenPreview.tsx` | One gallery preview: the registered screen in an inert, scaled iframe (`?preview=1`). |
| `src/prototype/FlowBar.tsx` | Bar above every screen: user type, flow, step X of N, previous/next, back to home, registry-issues badge. |
| `src/App.tsx` | Generates one route per registered screen, plus `/flow/:flowId` (opens the flow's start screen). |

Template-specific details:

- A screen entry also holds its React `component`, so routing comes from the registry too.
- Standalone screens set `standalone: true` and omit `flowId`.
- Variants set `parentScreenId` + `variant`, share the parent's `flowId`, and are **not** listed in `screenIds`.
- Shared screens set `shared: true`; other flows may then list them in their `screenIds`.
- `previewViewport` (`{ width, height }`) sets the gallery preview size for the whole registry (default
  1440 × 900) or for one screen.
- Routes are plain paths (no `:params`, `?`, `#`, or `*`) and must not start with `/flow/`, which is reserved
  for `Open flow` links.
- Prototype Home shows every validation issue at the top of the page, and the flow bar shows a badge with the
  count on every screen. Zero issues is part of "done".

---

## 1. User Type

Recommended fields:

```text
id
name
description
order
```

Example:

```json
{
  "id": "customer",
  "name": "Customer",
  "description": "Primary product user",
  "order": 1
}
```

---

## 2. Flow

Recommended fields:

```text
id
userTypeId
name
description
screenIds[]
startScreenId
status
order
```

Example:

```json
{
  "id": "customer-onboarding",
  "userTypeId": "customer",
  "name": "Account creation",
  "description": "Create and configure a new customer account.",
  "screenIds": [
    "customer-welcome",
    "customer-create-account",
    "customer-profile-setup",
    "customer-onboarding-complete"
  ],
  "startScreenId": "customer-welcome",
  "status": "ready-for-review",
  "order": 1
}
```

---

## 3. Screen

Recommended fields:

```text
id
userTypeId
flowId
name
description
route
status
variant
tags[]
```

Example:

```json
{
  "id": "customer-create-account",
  "userTypeId": "customer",
  "flowId": "customer-onboarding",
  "name": "Create account",
  "description": "Customer enters the information required to create an account.",
  "route": "/prototype/customer/onboarding/create-account",
  "status": "ready-for-review",
  "variant": "default",
  "tags": []
}
```

---

## 4. Optional Screen Variants

For important directly accessible states:

```text
variant
parentScreenId
```

Example:

```json
{
  "id": "customer-create-account-validation-error",
  "parentScreenId": "customer-create-account",
  "variant": "validation-error"
}
```

Use variants only when direct access to that state is useful.

---

## 5. Developer Shortcut

Recommended fields:

```text
id
label
screenId
description
group
order
```

A shortcut references a registered screen.

It does not redefine the screen.

---

## 6. Naming Conventions

IDs should be:

- stable
- lowercase
- machine-readable
- descriptive
- independent from temporary visual copy

Recommended pattern:

```text
[user-type]-[flow]-[screen]
```

Examples:

```text
customer-onboarding-create-account
provider-profile-verification
admin-user-management-detail
```

Routes should follow a similarly predictable structure when the project allows it.

Example:

```text
/prototype/customer/onboarding/create-account
```

Do not rename IDs every time the screen title changes.

---

## 7. Ordering

Recommended:

- user types have `order`
- flows have `order`
- screens are ordered by the flow's `screenIds`

This prevents conflicting screen-order fields.

If another ordering strategy is used, there still must be only one authoritative ordering mechanism.

---

## 8. Derived Information

The following should be derived rather than manually maintained when possible:

- number of flows
- number of screens
- number of steps in a flow
- first route in a flow
- screen step number
- screens grouped by user type
- screens grouped by flow
- Prototype Flows content
- All Prototype Screens content

Derived data reduces inconsistency.

---

## 9. Validation Rules

The registry should be considered invalid when:

- a user type ID is duplicated
- a flow ID is duplicated
- a screen ID is duplicated
- a route is duplicated
- a flow references a missing user type
- a flow references a missing screen
- a screen references a missing flow
- a screen user type conflicts with its flow user type
- a start screen is not part of its flow
- a normal screen is not assigned to a flow
- a screen exists in the product prototype but not in the registry

Projects are encouraged to automate these checks when practical.


## Visual preview derivation

All Prototype Screens renders each visual preview from the same registered React `component` used by the interactive route. Preview grouping, step labels, state labels, direct links, and counts must remain derived from this registry. If a screen needs preview-specific configuration or deterministic demo data, extend the existing typed registry model deliberately and keep fixtures typed; never create a second screen catalog or duplicate product UI and business logic. See `04-prototype-system.md` for the gallery behavior.

In this template, `previewViewport` is the only preview-specific field. Demo data comes from `src/data/`, the same
data the interactive route uses.
