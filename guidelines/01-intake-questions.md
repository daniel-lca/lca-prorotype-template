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

7. **Name and one-sentence pitch**: what is the product called, what is it, and who is it for?
   A working name is fine. The name is used for the project README, the app name, and the page title.
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

---

## After the go: project setup

Do this once, after the user says "go" and before you build the first screen.
The template files describe the template, not the product. The project repository must describe this prototype.

1. Replace `README.md` completely with the structure below. Do not keep any text from the template README.
2. In `src/prototype/registry.ts`, set `name` to the product name.
3. In `metadata.json`, set `name` to "<Product name> prototype".
   Set `description` to the pitch, followed by "Read AGENTS.md before making changes."
4. In `index.html`, set `<title>` to "<Product name> prototype".
5. In `package.json`, set `name` to the product name in kebab-case, for example `acme-booking-prototype`.
6. If the brief Fidelity is Mid-fi (Memorisely), run "Mid-fi setup" in `guidelines/design-system/README.md`
   (uncomment the `memorisely.css` import, add the Inter links, add `lucide-react`).
7. If the prototype is mobile-only, set `previewViewport: { width: 390, height: 844 }` in the registry.
8. Tell the user in one line that setup is done, then start the first flow.

README structure (replace every `<…>` with values from `project/BRIEF.md`):

````markdown
# <Product name> prototype

<One-sentence pitch.>

- **Purpose:** <what the prototype must validate or communicate>
- **Fidelity:** <Lo-fi / Lo-fi+ / Mid-fi (Memorisely)>
- **Devices:** <devices and breakpoints>
- **Live prototype:** <Vercel URL, or "Add the Vercel URL after the first deploy.">

## How to review

Open Prototype Home at `/`. It lists every user type, flow, and screen.
Select `Open flow` to start a journey. Use the bar at the top of each screen to move between steps.

## Where things are

| Path | Purpose |
|---|---|
| `project/BRIEF.md` | The confirmed brief: the product source of truth |
| `src/prototype/registry.ts` | Every user type, flow, screen, and route |
| `src/screens/` | One file per screen |
| `AGENTS.md`, `guidelines/` | Rules for the AI builder |

## Run locally

```bash
npm install
npm run dev
```

---

Built from the LCA prototype template.
````

README rules:

- Do not list flows or screens in the README. Prototype Home shows them from the registry.
- Write the README in English unless the user asks for another language.
- If the product name, pitch, purpose, fidelity, or devices change later, update `README.md` in the same task.
