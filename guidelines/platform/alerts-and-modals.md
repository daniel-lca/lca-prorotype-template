# Alerts, action sheets, and modals

Applies at every fidelity. Read `README.md` in this folder first. Build every overlay from `src/components/ui`.

## 1. Which one to use

| Need | Use | Component |
|---|---|---|
| Confirm an uncommon action that cannot be undone, or report a problem the person must act on | Alert | `AlertDialog` |
| Choose between actions related to what the person just did (for example: discard, save, or keep editing a draft) | Action sheet | `Sheet` with `side="bottom"`: a list of actions and "Cancel" |
| A short, separate task (filter, compose, edit one item) | Sheet | `Sheet` with `side="bottom"`, or `Dialog` |
| A long task or full content (camera, photo editing, video, a multistep form) | Full-screen view | A registered screen with its own close button |
| Information only, or an action the person can undo | No overlay | Inline message, `toast()`, or an undo action |

## 2. Alerts

1. Use alerts rarely. An alert stops the person's task.
2. Do not use an alert only to inform. Show the information inline.
3. Do not use an alert for common actions that the person can undo, even when they delete something.
4. Do not show an alert when the app starts. If the network is down at launch, show saved or placeholder content
   and a small inline label.
5. Show one alert at a time.

### Alert copy

- Title: say what happened in a few words. Do not use "Error" as the title.
- Message: add one only if it helps. Do not explain the buttons.
- Buttons: one or two words, usually a verb ("Delete", "Discard", "Retry"). Use "OK" only in an alert that
  only informs. Do not use "Yes" or "No".
- The button that cancels is always "Cancel".
- An alert has three buttons at most.

### Destructive actions

- If the alert confirms a destructive action, include "Cancel".
- Use the destructive style on the confirm button only when the person did not ask for the destruction directly.
  If they tapped "Empty Trash", the confirm button "Empty Trash" uses the normal style.
- Do not make "Cancel" the default button.

## 3. Sheets and full-screen views

1. Use a modal view only when it helps the person focus on one task.
2. Keep the task short. Do not build a second app inside the modal.
3. Give the modal a title that names its task.
4. Always give an obvious way to close it: a "Cancel" or "Done" button at the top, and swipe down for sheets.
5. If closing would lose the person's input, ask first. Use an action sheet with "Discard Changes", "Save", and
   "Cancel".
6. Close one modal before opening another. An alert can appear on top of a modal.

## 4. States to build

- Each important alert as a variant of the screen behind it, with `<AlertDialog defaultOpen>`.
- Each sheet that reviewers must see open, as a variant with the sheet open.
- The "unsaved changes" action sheet, if a modal holds form input.
