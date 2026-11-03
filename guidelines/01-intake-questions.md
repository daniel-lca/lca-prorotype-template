# 01 — Intake questions

Ask these **phase by phase**. For each phase:

- Send all of that phase's questions in one message, numbered.
- For multiple-choice questions, list the options and mark one as **(default)** so the user can
  reply "defaults" and move on.
- Skip a question when an earlier answer already settles it, and say why you skipped it.
- If an answer is vague, ask one follow-up, then pick the default and note the assumption.

---

## Phase 1 — Project type & setup

1. **What category is this?**
   - Web app (logged-in product: SaaS, tool, portal) **(default)**
   - Mobile app (native-feel app, simulated in the browser)
   - Website / landing page (marketing, content, one or more public pages)
   - Dashboard / admin panel / internal tool
   - E-commerce / marketplace
   - Other (describe)
2. **Target devices & breakpoints**
   - Responsive: mobile + tablet + desktop **(default)**
   - Desktop only (design at 1440px, must not break at 1280px)
   - Mobile only (design at 390px, shown inside a phone frame on desktop)
   - Mobile + desktop, no tablet-specific layout
3. **Fidelity level**
   - Lo-fi wireframe: grayscale, boxes, placeholder imagery **(default)**
   - Lo-fi+: grayscale layout with one accent color and real-looking copy
   - Mid-fi (Memorisely): the team design system: Slate + Violet tokens, Inter type, Lucide icons, real states and
     light motion. See `guidelines/design-system/README.md`.
   - If Mid-fi: **Dark mode too?** Yes / No **(default: No, light only)**
4. **Navigation pattern** (skip for single-page websites)
   - Top nav bar · Sidebar · Bottom tab bar (mobile) · Let the AI decide from the category **(default)**
5. **Language of the UI copy**: English **(default)** / Spanish / other.
6. **Does the prototype need to show logged-in vs logged-out states?** Yes / No **(default: No, start logged in)**

## Phase 2 — The product

7. **One-sentence pitch**: what is it and who is it for?
8. **Primary users / roles**: list each role and what they come to do. (e.g. "Admin — manages users", "Customer — books appointments")
   Each role becomes a **user type** in the prototype registry, so every flow belongs to exactly one.
9. **Core flows** (the 1–3 journeys the prototype must demonstrate end to end), and which role does each.
   Example: "Customer signs up → picks a service → books a slot → sees confirmation".
   Name each flow by the user's goal ("Book an appointment"), not by UI type ("Forms").
10. **Screens / pages list**: list what you already know. The AI will propose missing ones.
11. **Key content or data per screen**: what information must be visible? (tables, cards, forms, charts…)
12. **Key interactions**: modals, filters, multi-step forms, drag and drop, search, etc.
13. **Product rules**: permissions, limits, approvals, required information, role-specific behavior.
    Also: which edge cases or states should reviewers be able to open directly (empty, error, rejected…)?

## Phase 3 — Scope & references

14. **Out of scope**: anything the prototype must NOT include.
15. **References**: links or names of products/sites whose layout or flow you like.
16. **Anything else**: deadlines, the audience for the demo (client, internal, investors), must-have details.

---

## After Phase 3

1. Propose the prototype structure: **user types → flows → ordered screens**, with the start screen and
   route of each flow, plus any directly openable states (variants) and developer shortcuts.
   Use the naming rules in `05-prototype-schema.md` §6.
2. Fill `project/BRIEF.md` with every answer, marking assumptions as `(assumed)`. Anything still undecided
   goes under "Open questions" instead of being invented.
3. Show a summary of 10 lines or fewer and ask: **"Build it? (go / change something)"**.
