import { useEffect, useState } from 'react';
import { registry } from './registry';
import { checkSource, type DesignIssue } from './designRules';

export type { DesignIssue };

// Design check: scans the source of screens and shared components for patterns the design rules forbid, and
// says what to use instead. It runs only in development (AI Studio preview, npm run dev). The deployed prototype
// never loads it. Results appear on Prototype Home ("Design check"), in the flow bar badge, and in the console.
// Rules live in src/prototype/designRules.ts.

type Loaders = Record<string, () => Promise<string>>;

// Template building blocks and generated UI primitives are checked by hand, not here.
const loaders: Loaders = import.meta.env.DEV
  ? import.meta.glob<string>(
      [
        '../screens/**/*.tsx',
        '../components/**/*.tsx',
        '!../components/ui/**',
        '!../components/Placeholder.tsx',
        '!../components/Note.tsx',
        '!../components/PhoneFrame.tsx',
      ],
      { query: '?raw', import: 'default' },
    )
  : {};

let pending: Promise<DesignIssue[]> | undefined;

export function runDesignCheck(): Promise<DesignIssue[]> {
  pending ??= Promise.all(
    Object.entries(loaders).map(async ([path, load]) => checkSource(path.replace('../', 'src/'), await load(), registry.fidelity)),
  ).then((perFile) => {
    const issues = perFile.flat();
    if (issues.length > 0) {
      const lines = issues.slice(0, 40).map((i) => `${i.file}:${i.line}  ${i.found}  ->  use ${i.fix}`);
      const more = issues.length > 40 ? `\n…and ${issues.length - 40} more (see Prototype Home, Design check)` : '';
      console.warn(`Design check (${issues.length} issues, fidelity ${registry.fidelity}):\n${lines.join('\n')}${more}`);
    }
    return issues;
  });
  return pending;
}

/** Design issues for the current fidelity. `undefined` while loading; always [] outside development. */
export function useDesignIssues() {
  const [issues, setIssues] = useState<DesignIssue[] | undefined>(import.meta.env.DEV ? undefined : []);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let active = true;
    runDesignCheck().then((result) => active && setIssues(result));
    return () => {
      active = false;
    };
  }, []);
  return issues;
}
