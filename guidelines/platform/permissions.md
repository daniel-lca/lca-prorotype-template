# Permissions

Applies at every fidelity: this file is about behavior, not looks. Read `README.md` in this folder first for the
default-and-exceptions rule.

A permission is access to something private or protected: location, camera, microphone, photos, contacts,
calendar, Bluetooth, local network, health data, motion, notifications, or the advertising identifier (ad tracking).

## 1. How permissions work on a real device

The prototype must show what really happens, not only the happy path.

- **The operating system shows the permission alert, not the app.** The app cannot change its layout or buttons.
  On iOS, the app supplies one sentence for the alert (the purpose string, §3).
- **iOS asks once.** The system alert appears once per permission per install. After "Don't Allow", asking again
  shows nothing. The only way back is the app's page in the Settings app. The app can open that page directly.
- **Android asks at most twice.** If the person denies the same permission twice, Android stops showing the
  dialog. Android treats this as "don't ask again".
- **Answers can be partial.** People can share approximate location, a few photos, or access for one session
  only. See §8.
- **People can change their answer at any time** in Settings. The app must check the permission every time it
  needs it.

## 2. When to ask

1. Ask when the person first uses the feature that needs the permission. Example: ask for the camera when the
   person taps "Scan receipt", not on the home screen.
2. Ask during onboarding only if the app cannot work without the permission. Example: a navigation app and
   location. Then the onboarding step explains the benefit (see `onboarding.md`).
3. Do not ask for all permissions at launch.
4. Ask only for what the feature needs. A photo upload must not also ask for the microphone. **(App Review)**
5. If a system picker can do the job, use it and ask for nothing. Example: the photo picker lets the person
   choose photos without any photo permission. **(App Review)**
6. Notifications: ask after the person does something that makes notifications useful (places an order, follows
   someone, taps a bell). See `notifications.md`.

## 3. Purpose string (iOS alert text)

The purpose string is the sentence the system alert shows under its title. Write it in the brief's UI language.

- Write one complete sentence in active voice. Say what the app does with the data and why.
- Use sentence case and end with a period.
- Be specific. Do not write "for a better experience".
- Do not write an instruction ("Turn on microphone access.").

| Correct | Incorrect |
|---|---|
| "We use your location to show events within 5 km of you." | "Location access is needed for a better experience." |
| "The app records during the night to detect snoring sounds." | "Turn on microphone access." |

On Android and the web, the system text is fixed. Put the reason in the app's own screen instead (§4).

## 4. Explanation screen before the system alert

An explanation screen is the app's own screen (or dialog) that explains a permission before the system alert
opens. It is optional. Add one only if the current screen does not already make the reason clear.

### iOS (default rules)

1. Give the explanation screen **exactly one button**. Title it "Continue" or "Next". The button opens the
   system alert.
2. Do not add Cancel, Close, "Not now", "Skip", or any other way to leave without seeing the system alert.
   Exception: a legal consent step that the law requires.
3. Do not title the button "Allow", "Enable", or "Turn on". People think they already chose, and then tap
   "Allow" in the system alert without reading it.
4. Explain the benefit in plain words. Say that the person can change the choice later in Settings.
5. Do not show a picture of the system alert. Do not point at its "Allow" button.

### Android (default rules)

1. Ask in context first: the person taps the feature, then the system dialog opens. Do not show an explanation
   screen before the first request unless the reason is unclear.
2. If the person denied the permission once and taps the feature again, show an explanation screen.
3. On Android, the explanation screen **must** have a way to decline, such as "Not now". Android does not
   allow the app to block the person.
4. Title the main button "Continue". It opens the system dialog again.
5. After the second denial, the system dialog does not open. Show the denied state (§6).

### Both platforms

If the brief's Platform is Both, build the iOS pattern in the main flow. Add the Android differences as variants
only if the brief asks reviewers to see Android.

### Ad tracking (App Tracking Transparency, iOS)

These rules are stricter. **(App Review)** Apple rejects apps that break them.

- Show the system tracking alert before the app collects any tracking data.
- An explanation screen is allowed. It must not mislead.
- Do not offer a reward for allowing tracking ("Allow tracking and get $10").
- Do not make the explanation screen look like the system alert, and do not title its button "Allow".
- Do not show a picture of the alert. Do not add arrows or text such as "Choose Allow when prompted".
- Do not block features or content when the person chooses "Ask App Not to Track".
- A consent screen that local privacy law requires is allowed before or after the system alert.

## 5. What the app must never do

- Block the app, or features that do not need the permission, until the person allows it. **(App Review)**
- Offer a reward for allowing a permission. **(App Review)**
- Ask again and again after a denial, or show a reminder popup on every launch.
- Make a paid feature depend on a permission it does not need. **(App Review)**

## 6. After a denial

1. Keep the app working. Disable or reduce only the feature that needs the permission.
2. Offer another way where possible. **(App Review)** Examples: type an address instead of sharing location; pick
   one photo with the system picker instead of full photo access; enter a contact by hand.
3. Show the reduced state **inline**, where the feature is. Use a short explanation and the alternative. Do not
   use a popup.
4. Show the path to Settings only when the person tries to use the feature again. On iOS, use a button titled
   "Open Settings". Do not push people to Settings to change their mind right after they denied.
5. When the person comes back from Settings with the permission on, the feature works with no extra steps.

## 7. States to build

Build this set for **every permission in the brief** (`project/BRIEF.md` → Device permissions). Each state must
open directly from Prototype Home.

| # | State | What reviewers see | Register it as |
|---|---|---|---|
| 1 | Feature entry | The screen where the person starts the feature | A step in the flow |
| 2 | Explanation screen | The app's own explanation (§4), if the flow has one | A step in the flow |
| 3 | System alert | The screen behind it, with `SystemAlert` open (§10) | A variant of the screen behind it, e.g. `system-alert` |
| 4 | Granted | The feature working | The next step in the flow |
| 5 | Denied | The feature reduced, the alternative, and "Open Settings" (§6) | A variant of the feature screen, e.g. `location-denied` |
| 6 | Partial | Approximate location, selected photos, or similar (§8) | A variant, only if the brief's flow depends on it |

Rules:

- In the system alert variant, each alert button goes to the next state: the allow buttons go to state 4, and
  "Don't Allow" goes to state 5.
- The explanation screen's single button goes to state 3.
- Name variants by state: `location-denied`, `camera-system-alert`, `photos-limited`.
- List the permission states under "Directly openable states" in `project/BRIEF.md`.

### Example: location during onboarding (iOS)

The app needs location to work, so onboarding asks for it.

1. Onboarding step "Find events near you" (explanation screen). One button: "Continue".
2. Variant `location-system-alert`: the same step, with `SystemAlert` open. Buttons: "Allow Once", "Allow While
   Using App", "Don't Allow".
3. "Allow Once" and "Allow While Using App" go to the next onboarding step (granted).
4. "Don't Allow" goes to variant `location-denied`: the next step works with a city search instead of nearby
   events, and shows "Open Settings" on the map screen.

If the brief records an exception that adds "Not now" to the explanation screen, add one more variant:
`location-skipped`. The feature is off, and the app has not shown the system alert yet. The next time the person
uses the feature, the explanation screen appears again. The system alert can still open, because the person has
never answered it.

## 8. Partial answers by permission

| Permission | iOS choices | Android choices | Build in the prototype |
|---|---|---|---|
| Location | Allow Once, Allow While Using App, Don't Allow. A "Precise" switch in the alert | While using the app, Only this time, Don't allow. Precise or Approximate | Approximate location state if the feature needs precision (e.g. turn-by-turn). Background ("Always") access is a separate, later request |
| Photos | Limit Access (select photos), Allow Full Access, Don't Allow | Select photos and videos, Allow all, Don't allow (Android 14+) | Prefer the system photo picker. With limited access, show only the selected photos and a way to select more |
| Camera, microphone | Allow, Don't Allow | While using the app, Only this time, Don't allow | Usually no partial state |
| Contacts | Full access, selected contacts only (iOS 18 and later), or Don't Allow | Allow, Don't allow | Prefer the system contact picker. With selected contacts, do not assume the list is complete |
| Notifications | Allow, Don't Allow | Allow, Don't allow (Android 13+) | See `notifications.md` |
| Ad tracking (iOS) | Allow, Ask App Not to Track | No system dialog | The app works the same after either answer |

"Allow Once" and "Only this time" grant access for the current session. The app asks again next time. A
prototype usually treats them as granted.

## 9. Web apps and browser permissions

Websites ask through the browser. The same principles apply:

- Ask when the person uses the feature. The browser shows its own prompt (Allow, Block).
- After "Block", the site cannot ask again. The person must change it in the site settings, from the address
  bar. Explain this inline in the denied state, with the alternative.
- An explanation before the browser prompt may include "Not now". The one-button rule in §4 is for iOS.

Use `SystemAlert` with `platform="web"` for the browser prompt.

## 10. The SystemAlert component

Show every system permission alert with `SystemAlert` from `src/components/SystemAlert.tsx`. Do not build your
own copy of a system alert. Name the variant so reviewers know the alert belongs to the system, for example
`location-system-alert`. Do not add labels or notes inside the alert.

```tsx
import { SystemAlert } from '@/components/SystemAlert';

// Variant screen: the explanation step, with the system alert open on top.
export function OnboardingLocationSystemAlert() {
  return (
    <>
      <OnboardingLocation />
      <SystemAlert
        platform="ios"
        title="Allow “Outside” to use your location?"
        message="We use your location to show events within 5 km of you."
        actions={[
          { label: 'Allow Once', to: 'onboarding-notifications' },
          { label: 'Allow While Using App', to: 'onboarding-notifications' },
          { label: "Don't Allow", to: 'onboarding-location-denied' },
        ]}
      />
    </>
  );
}
```

- `platform`: `'ios'` (default), `'android'`, or `'web'`.
- `actions`: the system buttons, top to bottom, each with the screen ID it opens.
- Write the title and buttons as the real system would. iOS titles: "Allow “<App>” to use your location?",
  "“<App>” Would Like to Access Your Contacts". Android titles: "Allow <App> to access this device's location?".
- The alert cannot be closed with Escape or a click outside, like a real system alert.
