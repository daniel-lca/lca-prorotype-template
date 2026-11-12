# Notifications

Applies at every fidelity. Read `README.md` in this folder first.

## 1. Asking for permission

1. The app must get permission before it sends any notification. On iOS, and on Android 13 and later, the
   system shows a permission alert. Follow `permissions.md` for the explanation screen and the states.
2. Ask after the person does something that makes notifications useful. Examples: places an order, follows a
   person, saves a search, taps a bell icon. On Android, another option is the third or fourth launch.
3. Do not ask at first launch unless notifications are the core of the app (for example a messaging app).
4. The app must work without notifications. **(App Review)**

## 2. Settings in the app

1. Give the app a notification settings screen, in addition to the system permission. People must be able to
   change what they receive inside the app.
2. If the system permission is off, the settings screen says so, and shows "Open Settings".

## 3. Marketing notifications

1. Send promotions only after the person opts in to them. **(App Review)**
2. Ask with the app's own screen or dialog. Say what the messages are, and give a clear choice to accept or decline.
3. The person must be able to turn marketing messages off in the app's notification settings.

## 4. Writing notifications

When the prototype shows a notification (on a lock screen mock, or in an in-app list):

- Keep it short and useful. Do not send several notifications about the same thing.
- Do not tell people to open the app to do a task. Add a notification action instead.
- Do not show private details. Use a generic line, such as "New message", for hidden previews.
- Do not use a notification for an error. Use an alert in the app.
- If the app is open, do not show a notification. Update the screen or the badge instead.
- Use a badge only for the number of unread items.

## 5. States to build

- The permission states from `permissions.md` §7, at the moment the app asks.
- The app's notification settings screen, with the system permission on and off.
- The marketing opt-in screen, if the product sends promotions.
