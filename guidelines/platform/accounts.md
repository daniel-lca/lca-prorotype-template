# Accounts: sign up, sign in, delete

Applies at every fidelity. Read `README.md` in this folder first.

## 1. When to ask for an account

1. If the app has no important account-based features, let people use it without an account. **(App Review)**
2. Ask for sign-in as late as possible. Example: a shopping app lets people browse and asks them to sign in at
   checkout.
3. On the sign-in screen, explain in one or two lines what an account gives the person.
4. Ask only for the data the account needs. Name and email are optional unless the feature needs them.
   **(App Review)**

## 2. Sign-in methods

1. If the app offers a social login (Google, Facebook, X, LinkedIn, Amazon, WeChat) for the main account, it must
   also offer an equivalent login that:
   - collects only name and email,
   - lets the person hide their email address, and
   - does not track the person for ads without consent.

   Sign in with Apple meets these conditions. **(App Review)** This rule does not apply when the app uses only its
   own accounts, or a required work, school, or government login.
2. If the app does not use Sign in with Apple, prefer passkeys over passwords. If it keeps passwords, add a
   two-factor step.
3. Name the method on the button: "Sign in with Face ID", not only "Sign in".
4. Do not show a method that the device does not have (for example Face ID on a device without it).
5. Do not add an in-app switch to turn on Face ID or Touch ID. The person sets this in the system.
6. Do not use the word "passcode" for the app's password. People think the app wants their phone passcode.

## 3. Account deletion

If people can create an account in the app, they must be able to delete it from the app. **(App Review)**

1. Put "Delete account" in account settings, where people expect it. Do not hide it in the privacy policy.
2. Delete the account. Deactivating it is not enough.
3. If deletion happens on a website, link directly to the deletion page.
4. Keep the flow short, and the same length in the app and on the website.
5. Confirm before deleting. Use an alert with "Delete Account" (destructive) and "Cancel" (see
   `alerts-and-modals.md`).
6. Tell people when deletion will be complete. If it is not immediate, tell them when it is finished.
7. You can let people schedule deletion for later. If you do, also offer to delete now.
8. If the person has a subscription, say that billing continues until they cancel it, and show how to cancel.

## 4. States to build

- Sign-in screen, and its error state (wrong password, account not found).
- Sign-up screen, if the app creates accounts.
- The screen that asks for sign-in at the moment it is needed (for example checkout), if sign-in is delayed.
- Delete account: the settings entry, the confirmation alert, and the "account deleted" screen.
