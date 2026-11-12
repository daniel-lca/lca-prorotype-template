# Ratings, in-app purchases, and subscriptions

Applies at every fidelity. Read `README.md` in this folder first.

## 1. Asking for a rating

1. Ask only after the person shows engagement. Example: after they finish a level or an important task.
2. Never ask on first launch or during onboarding.
3. Ask at a natural pause, not during a task.
4. Use the system rating prompt. Do not build a custom rating dialog. **(App Review)** On iOS, the system shows
   it at most three times per year, and only if the person has not turned it off.
5. Do not require a rating to use any feature. **(App Review)**
6. Wait at least one or two weeks between requests.

Show the system rating prompt with `SystemAlert` (title "Enjoying <App>?", the five stars written as text in lo-fi,
buttons "Submit" and "Not Now"). Register it as a variant.

## 2. Purchases

1. Let people try the app before asking them to pay.
2. Show the total price of every item.
3. Use the system purchase confirmation. Do not copy or change it.
4. If the person cannot pay (for example parental controls), hide the store or explain why it is not available.
5. Credits and in-app currency that people buy must not expire.
6. Offer "Restore Purchases" for purchases that the person keeps. **(App Review)**

## 3. Subscriptions and paywalls

### The sign-up screen (paywall) must show

- the subscription name, its period, and what the person gets in each period;
- the price for each period, in the local currency;
- for a free trial: how long it lasts, and the amount charged when it ends;
- for an introductory price: that price, how long it lasts, and the normal price after it;
- "Restore Purchases" or "Sign In" for people who already subscribe;
- links to the terms of service and the privacy policy. **(App Review)**

### Rules

1. Show the paywall at a relevant moment. Example: when the person reaches the free limit.
2. Do not show the paywall to people who already subscribe.
3. Ask only for the data the subscription needs. Ask other questions after sign-up.
4. Put a way to subscribe in the app's settings.
5. Make cancelling easy. In settings, show the plan, the next renewal date, and "Manage Subscription". This opens
   the system subscription screen.
6. When the person starts to cancel, you can show what they will lose or offer another plan. Do not block the
   cancellation.
7. If the person bought the subscription on another platform or the website, give a way to sign in, so they do
   not pay twice.

## 4. States to build

- The paywall, and the variant shown when the free limit is reached.
- The system purchase confirmation, as a variant with `SystemAlert` if reviewers need to see it.
- Purchase success, and purchase canceled (back to the paywall with nothing changed).
- Restore purchases: success, and "nothing to restore".
- Settings: subscription details with "Manage Subscription".
