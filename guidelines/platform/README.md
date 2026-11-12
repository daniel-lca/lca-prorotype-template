# Platform rules (iOS, Android, web)

Rules that change **flows and screens** because of how the operating system or the app stores work: permissions,
onboarding, accounts, notifications, alerts, ratings, and purchases. They come from Apple's Human Interface
Guidelines (HIG), Apple's App Review Guidelines, and Android's developer guides, rewritten for this template.

These files do not change how screens look. Visual rules still come from the brief's fidelity
(`02-lofi-prototype-rules.md` and `guidelines/design-system/`). Do not copy iOS or Android visual styles (San
Francisco font, iOS blue, Material components) into product screens.

## When to read these files

Read this README when the brief's **Platform** answer (`project/BRIEF.md` → Setup) is Both, iOS only, or Android
only. Then open the file for the topic you are building:

| File | Read it when the prototype has… |
|---|---|
| [permissions.md](permissions.md) | location, camera, microphone, photos, contacts, calendar, Bluetooth, health, notifications, or ad tracking |
| [onboarding.md](onboarding.md) | a first-run flow, welcome screens, or setup steps |
| [accounts.md](accounts.md) | sign up, sign in, social login, or account settings |
| [notifications.md](notifications.md) | push notifications, a notification settings screen, or marketing messages |
| [alerts-and-modals.md](alerts-and-modals.md) | confirmations, errors, action menus, sheets, or full-screen tasks |
| [ratings-and-purchases.md](ratings-and-purchases.md) | a rating prompt, a paywall, subscriptions, or in-app purchases |

If the Platform answer is **Mobile web** or the product is a web app, read `permissions.md` §9 only when a
feature uses a browser permission (location, camera, microphone, notifications).

## Cross-platform apps (the default)

Most products ship on iOS and Android. Design one product that feels the same on both, and follow each platform
only where the system controls the experience.

| Area | Rule |
|---|---|
| Product screens (layout, components, visual style) | Platform-neutral. Use the brief's fidelity and `src/components/ui`. Do not copy iOS-only or Android-only patterns |
| System moments (permission alerts, rating prompt, purchase confirmation, notifications) | Follow the platform rules in these files. They differ by platform |
| Main navigation | A bottom tab bar for 3 to 5 main sections. Both platforms recommend it. Do not use a hamburger menu as the main navigation. A menu for secondary items is fine |
| Back navigation | Every screen below the top level has a back button at the top left. Android also has a system back gesture, so do not rely on a custom gesture only |
| Touch targets | At least 48 × 48 px (Android asks for 48 dp, iOS for 44 pt). This is stricter than the general 44 px in `design-system/accessibility.md` |
| App store rules (accounts, purchases, ratings) | Apply the Apple rules marked **(App Review)**. Google Play has similar rules, so one design usually satisfies both |

Where the two platforms differ on the same moment (for example the explanation screen before a permission,
`permissions.md` §4), build the iOS rule in the main flow, because App Review is stricter. Add the Android version
as a variant only if the brief asks reviewers to see Android.

## Default and exceptions

1. **Follow these rules by default.** They describe what Apple and Google expect, and what App Review checks.
2. **The user can ask for a different pattern.** Follow the user's answer. Record it in `project/BRIEF.md` →
   "Decisions & exceptions", with the rule it replaces. Example: "Location explanation screen has a 'Not now'
   button (replaces permissions.md §4, one-button rule). Asked by the client to match the current app."
3. **Warn once, then follow.** When a request breaks a rule marked **App Review** in these files, tell the user in
   one sentence that Apple can reject the real app for it. Then build what the user asked for.
4. Do not apply an exception to other screens or other projects. Each exception covers only what the user named.

Precedence: the user's explicit answer → `AGENTS.md` and guidelines `01`–`08` → these platform files →
`guidelines/design-system/`.

## Do not research these topics yourself

These files are the reference for the prototype. Do not fetch Apple or Android pages during a project. If the
brief needs a platform topic that these files do not cover, say so in your reply and ask the user what to build.
Do not guess platform rules.

## Sources (for template maintainers)

Each file lists the rules in our own words. The sources and the date of their last change:

| Source | Page's own last change | Checked |
|---|---|---|
| HIG: Privacy | 2023-06-21 | 2026-11-12 |
| HIG: Onboarding | 2024-06-10 | 2026-11-12 |
| HIG: Managing accounts | no change log | 2026-11-12 |
| HIG: Managing notifications | no change log | 2026-11-12 |
| HIG: Notifications | 2023-10-24 | 2026-11-12 |
| HIG: Alerts | 2024-02-02 | 2026-11-12 |
| HIG: Modality | 2023-12-05 | 2026-11-12 |
| HIG: Ratings and reviews | 2023-09-12 | 2026-11-12 |
| HIG: Apple In-App Purchase | 2026-09-17 | 2026-11-12 |
| App Review Guidelines (3.1, 4.5.4, 4.8, 5.1.1, 5.1.2, 5.6.1) | 2026-10-16 | 2026-11-12 |
| Android: Request runtime permissions, permission usage notes, location permissions, notification permission, partial photo access | no change log | 2026-11-12 |

To check for changes:

1. Open `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`
   (for example `privacy`, `onboarding`, `managing-accounts`, `apple-in-app-purchase`). The HTML pages need
   JavaScript and return only a title to scripts. The JSON has the full text.
2. Compare the page's change log with the table above.
3. If a page changed, update the matching file and its rows in this table.

Apple usually updates the HIG in June, at its developer conference.
