# LCA lo-fi prototype template

Starting point for clickable prototypes built in **Google AI Studio (Build mode)**,
kept in GitHub and deployed to **Vercel**.

**Core principle:** a prototype screen is never an isolated artifact. Every screen is registered in one
prototype registry (`src/prototype/registry.ts`), and the Prototype Home at `/` lists every flow and every
screen from that registry, grouped by user type. If the registry is out of sync, Prototype Home says so.

## How to start a new prototype

1. **Create the repo** from this template (GitHub → *Use this template*, or copy the files into a new repo).
2. **Import it in AI Studio**: Build → `+` in the prompt box → *Import from GitHub* → pick the repo.
3. **Paste the kickoff prompt** from [`KICKOFF_PROMPT.md`](KICKOFF_PROMPT.md) as your first message.
   AI Studio reads the guidelines and runs the intake in three phases:
   1. Project type & setup (category, breakpoints, fidelity, navigation, language)
   2. The product (user types, flows, screens, content, interactions, product rules)
   3. Scope & references
4. **Confirm the brief** that AI Studio writes to [`project/BRIEF.md`](project/BRIEF.md). It builds after you say "go".
5. **Sync to GitHub** from AI Studio (Settings → GitHub → push).
6. **Deploy on Vercel**: import the repo, preset *Vite*. Every push redeploys.

## What's in here

| Path | Purpose |
|---|---|
| `AGENTS.md` | Entry point for the AI: rules and reading order |
| `KICKOFF_PROMPT.md` | First message to paste in AI Studio |
| `guidelines/01`–`03` | Intake questions, lo-fi visual rules, tech & deploy rules |
| `guidelines/04`–`08` | Prototype system: Prototype Home, registry schema, screen/flow lifecycle, UX rules, AI workflow |
| `guidelines/design-system/` | Memorisely design rules (accessibility, interactions, status, spacing, text, color, radius…) and when each applies |
| `project/BRIEF.md` | The brief, filled in during intake |
| `src/prototype/` | Registry, validation, Prototype Home, flow bar |
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
