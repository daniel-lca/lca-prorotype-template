import type { Fidelity } from './types';

// Design rules used by the design check (src/prototype/designCheck.ts). Pure functions, no app imports.
// Rules: guidelines/design-system/README.md, text.md, spacing.md, radius.md, color.md, 02-lofi-prototype-rules.md.

export interface DesignIssue {
  file: string;
  line: number;
  found: string;
  fix: string;
}

interface TokenRule {
  test: RegExp;
  fix: string | ((token: string) => string);
  only?: Fidelity[];
}

const GRAY = '(slate|gray|neutral|zinc|stone)';
const HUE = '(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)';

/** Mid-fi: palette classes that duplicate a Memorisely semantic token (src/styles/memorisely.css). */
const MIDFI_SEMANTIC: [RegExp, string][] = [
  [/^bg-white$/, 'bg-background (page) or bg-card (surface)'],
  [new RegExp(`^text-${GRAY}-(900|950)$`), 'text-foreground'],
  [new RegExp(`^text-${GRAY}-(400|500|600)$`), 'text-muted-foreground'],
  [new RegExp(`^text-${GRAY}-(700|800)$`), 'text-foreground or text-secondary-foreground'],
  [new RegExp(`^bg-${GRAY}-(50|100)$`), 'bg-muted or bg-secondary'],
  [new RegExp(`^bg-${GRAY}-(800|900|950)$`), 'bg-foreground / bg-primary, or dark mode tokens'],
  [new RegExp(`^(border|divide)-${GRAY}-(100|200)$`), 'border-border'],
  [new RegExp(`^(border|divide)-${GRAY}-(300|400)$`), 'border-input'],
  [/^bg-violet-(500|600|700)$/, 'bg-primary (hover: bg-primary-hover)'],
  [/^text-violet-(500|600)$/, 'text-primary'],
  [/^text-violet-(700|800|900)$/, 'text-accent-foreground'],
  [/^bg-violet-(50|100)$/, 'bg-accent'],
  [/^(border|ring|outline)-violet-\d+$/, 'border-primary, ring-ring, or outline-ring'],
  [/^(bg|text|border)-red-\d+$/, 'destructive tokens: bg-destructive, text-destructive, border-destructive'],
  [/^(bg|text|border)-(emerald|green)-\d+$/, 'success tokens: text-success, bg-success-subtle, text-success-subtle-foreground'],
  [/^(bg|text|border)-(amber|yellow|orange)-\d+$/, 'warning tokens: text-warning, bg-warning-subtle, text-warning-subtle-foreground'],
  [/^(bg|text|border)-(sky|blue|cyan)-\d+$/, 'info tokens: text-info, bg-info-subtle, text-info-subtle-foreground'],
];

const TOKEN_RULES: TokenRule[] = [
  { test: /^[a-z-]+-lca-[a-z-]+$/, fix: 'product colors; lca-* colors are for Prototype Home and the flow bar only' },
  { test: /^font-(bold|extrabold|black)$/, fix: 'font-medium for headings and labels, font-semibold for buttons (text.md)' },
  { test: /^font-(thin|extralight|light)$/, fix: 'font-normal (text.md)' },
  { test: /^uppercase$/, fix: 'sentence case text, no uppercase labels (text.md)' },
  { test: /^tracking-(wide|wider|widest)$/, fix: 'default letter spacing (text.md)' },
  { test: /^text-\[\d+(\.\d+)?(px|rem)\]$/, fix: 'the type scale: text-xs / text-sm, or text-small / text-body in Mid-fi (text.md)' },
  { test: /^(min-)?h-screen$/, fix: 'h-[calc(100dvh-var(--prototype-bar-height,0px))] (02, Prototype tooling)' },
  { test: /^rounded-3xl$/, fix: 'rounded-md (controls), rounded-lg (cards), rounded-xl (dialogs) (radius.md)' },
  { test: /^rounded-2xl$/, fix: 'rounded-lg (cards) or rounded-xl (dialogs); 2xl is for marketing pages only (radius.md)', only: ['mid-fi'] },
  { test: /^shadow-(lg|xl|2xl)$/, fix: 'shadow-xs or shadow-sm, or a border (color.md)' },
  { test: /^shadow-md$/, fix: 'shadow-sm or a border (02: no shadows beyond shadow-sm)', only: ['lo-fi', 'lo-fi-plus'] },
  { test: /^animate-(spin|pulse|bounce|ping)$/, fix: 'static text such as "Saving…" (02: no animation in lo-fi)', only: ['lo-fi', 'lo-fi-plus'] },
  { test: /^[a-z]+-(slate|gray|zinc|stone)-\d+$/, fix: 'the matching neutral-* shade; lo-fi uses neutral only (02)', only: ['lo-fi', 'lo-fi-plus'] },
  { test: new RegExp(`^[a-z]+-${HUE}-\\d+$`), fix: 'neutral-* shades: lo-fi is grayscale (02)', only: ['lo-fi'] },
  { test: /^(bg|text|border|divide|ring|outline)-neutral-\d+$/, fix: 'Memorisely semantic tokens (Slate palette); neutral is for lo-fi', only: ['mid-fi'] },
  {
    test: /./,
    only: ['mid-fi'],
    fix: (token) => MIDFI_SEMANTIC.find(([pattern]) => pattern.test(token))?.[1] ?? '',
  },
];

const LINE_RULES: { test: RegExp; fix: string }[] = [
  { test: /\bfixed\b[^"'`]*\binset-0\b|\binset-0\b[^"'`]*\bfixed\b/, fix: '<dialog className="m-auto …"> opened with showModal() (design-system README, Shared conventions)' },
  { test: /\bto=\{?["'`]\/|navigate\(\s*["'`]\/|href=["']\/(?!\/)/, fix: 'ScreenLink / useGoToScreen with a screen ID (02, Behavior)' },
  { test: /from ['"]react-router-dom['"]/, fix: 'ScreenLink / useGoToScreen from src/prototype/navigation.tsx (02, Behavior)' },
];

/** The class token without variant prefixes: "md:hover:bg-white" -> "bg-white". Keeps "!" and opacity out. */
function baseToken(token: string) {
  const base = token.slice(token.lastIndexOf(':') + 1).replace(/^!/, '');
  return base.replace(/\/\d+$/, '');
}

export function checkSource(file: string, source: string, fidelity: Fidelity): DesignIssue[] {
  const issues: DesignIssue[] = [];
  source.split('\n').forEach((text, index) => {
    const line = index + 1;
    const seen = new Set<string>();
    for (const rule of LINE_RULES) {
      const match = text.match(rule.test);
      if (match) issues.push({ file, line, found: match[0].trim(), fix: rule.fix });
    }
    for (const token of text.split(/[\s"'`{}()<>,;=]+/)) {
      if (!token || seen.has(token)) continue;
      const base = baseToken(token);
      for (const rule of TOKEN_RULES) {
        if (rule.only && !rule.only.includes(fidelity)) continue;
        if (!rule.test.test(base)) continue;
        const fix = typeof rule.fix === 'function' ? rule.fix(base) : rule.fix;
        if (!fix) continue;
        issues.push({ file, line, found: token, fix });
        seen.add(token);
        break;
      }
    }
  });
  return issues;
}
