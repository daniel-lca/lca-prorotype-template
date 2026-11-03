# LCA lo-fi prototype template

Starting point for clickable prototypes built in **Google AI Studio (Build mode)**,
kept in GitHub and deployed to **Vercel**.

> This README describes the template. In each project, AI Studio replaces it with a README for that product
> during project setup (right after you confirm the brief).

**Core principle:** a prototype screen is never an isolated artifact. Every screen is registered in one
prototype registry (`src/prototype/registry.ts`), and the Prototype Home at `/` lists every flow and every
screen from that registry, grouped by user type. If the registry is out of sync, Prototype Home says so.

## How to start a new prototype

1. **Import it in AI Studio**: Build → `+` in the prompt box → *Import from GitHub* → pick this template repo
   (or a copy made with GitHub → *Use this template*).
2. **Paste the kickoff prompt** from [`KICKOFF_PROMPT.md`](KICKOFF_PROMPT.md) as your first message.
   AI Studio reads the guidelines and runs the intake in three phases:
   1. Project type & setup (category, breakpoints, fidelity, navigation, language)
   2. The product (name, user types, flows, screens, content, interactions, product rules)
   3. Scope & references
3. **Confirm the brief** that AI Studio writes to [`project/BRIEF.md`](project/BRIEF.md). After you say "go",
   it runs project setup (project README, app name, page title) and then builds.
4. **Save to GitHub** from AI Studio: Settings → GitHub → create a new repository for the project
   (or link the copy you made in step 1). **Never link the app to this template repo**: every push would
   overwrite the template with project work.
5. **Deploy on Vercel**: import the project repo, preset *Vite*. Every push redeploys.

## What's in here

| Path | Purpose |
|---|---|
| `AGENTS.md` | Entry point for the AI: rules and reading order |
| `KICKOFF_PROMPT.md` | First message to paste in AI Studio |
| `guidelines/01`–`03` | Intake questions, lo-fi visual rules, tech & deploy rules |
| `guidelines/04`–`08` | Prototype system: Prototype Home, registry schema, screen/flow lifecycle, UX rules, AI workflow |
| `guidelines/design-system/` | Memorisely design rules (accessibility, interactions, status, spacing, text, color, radius…) and when each applies |
| `project/BRIEF.md` | The brief, filled in during intake |
| `src/prototype/` | Registry, validation, Prototype Home (with the visual screen gallery), flow bar, `ScreenLink` |
| `src/components/` | `Placeholder`, `Note`, `PhoneFrame` building blocks |

## Fidelity levels

| Level | Look |
|---|---|
| Lo-fi (default) | Grayscale wireframe, placeholder boxes |
| Lo-fi+ | Grayscale plus one accent color, real-looking copy |
| Mid-fi (Memorisely) | Team design system: Slate + Violet tokens, Inter type, Lucide icons, optional dark mode |

Behavior rules (accessibility, interaction states, system status, progressive disclosure, responsive, spacing,
type weights and casing) apply at every level.

## Local dev

```bash
npm install
npm run dev
```
