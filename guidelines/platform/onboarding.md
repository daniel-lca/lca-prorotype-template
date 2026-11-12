# Onboarding

Applies at every fidelity. Read `README.md` in this folder first.

Onboarding is what a person sees the first time they open the app, after launch.

## 1. Keep it short or skip it

1. Let people use the app as soon as possible. Many apps need no onboarding flow.
2. If onboarding is needed, keep it to the few steps the app cannot work without.
3. Teach by doing. Prefer one interactive step (try the main action) over several slides of text.
4. Prefer short tips near the feature, shown when the person reaches it, to one long tutorial at the start.
5. Do not teach how to use the phone. Teach only what is special about this app.
6. If there is a separate tutorial, make it optional. If the person skips it, do not show it again on the next
   launch. Put it in help or settings, where the person can find it later.

## 2. What goes in onboarding, and what waits

| Put in onboarding | Wait until later |
|---|---|
| A permission the app cannot work without (see `permissions.md` §2) | Permissions for single features: ask at first use |
| Sign-in, only if the core of the app needs an account (see `accounts.md`) | Account creation for an app people can use without one |
| A short explanation of subscription benefits, if the app has a paywall (see `ratings-and-purchases.md`) | Profile details, preferences, and customization. Use sensible defaults |
| | Rating requests: never during onboarding |
| | Legal text: the App Store shows agreements. If the product needs it, keep it short and do not break the flow |

## 3. Splash screen

A splash screen is optional. If the brief has one, show it only long enough to read at a glance. Do not use it as
a loading screen for large downloads.

## 4. States to build

- The onboarding flow, step by step, as a flow in the registry.
- For each permission step: the states in `permissions.md` §7.
- If onboarding can be skipped: the screen the person lands on after "Skip".
- If sign-in is part of onboarding: the error state of the sign-in step.
