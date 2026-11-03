import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDesignIssues } from './designCheck';
import { contextFlow, FLOW_PARAM, hrefFor, screenLabel, stepInfo } from './derive';
import { registry } from './registry';
import type { Screen } from './types';
import { registryIssues } from './validate';

// Prototype tooling bar above every registered screen: where am I, previous/next step, back to Prototype Home,
// and issue badges. It uses the LowCode Agency brand at every fidelity (src/prototype/tooling.css).
// It is not sticky: it scrolls away with the page, so it never covers a product's own sticky header.
// It publishes its height as --prototype-bar-height for full-height app shells.

const STORAGE_KEY = 'prototype-flowbar-hidden';
const BAR_HEIGHT_VAR = '--prototype-bar-height';
const linkClass =
  'rounded-sm px-1 py-0.5 text-lca-cream/80 transition-colors duration-200 hover:text-lca-purple-light focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-lca-purple-light';
const badgeClass =
  'rounded-sm px-1.5 py-0.5 font-semibold text-lca-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-lca-cream';

function readHidden() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function setBarHeight(px: number) {
  document.documentElement.style.setProperty(BAR_HEIGHT_VAR, `${px}px`);
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export function FlowBar({ screen }: { screen: Screen }) {
  const [hidden, setHidden] = useState(readHidden);
  const [params] = useSearchParams();
  const barRef = useRef<HTMLElement>(null);
  const designIssues = useDesignIssues();
  const flow = contextFlow(screen, params.get(FLOW_PARAM));
  const info = stepInfo(screen, flow);
  const userType = registry.userTypes.find((u) => u.id === (flow?.userTypeId ?? screen.userTypeId));
  const designCount = designIssues?.length ?? 0;
  const issueCount = registryIssues.length + designCount;

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      setBarHeight(0);
      return;
    }
    const observer = new ResizeObserver(() => setBarHeight(bar.offsetHeight));
    observer.observe(bar);
    setBarHeight(bar.offsetHeight);
    return () => {
      observer.disconnect();
      setBarHeight(0);
    };
  }, [hidden]);

  const toggle = () => {
    setHidden(!hidden);
    try {
      localStorage.setItem(STORAGE_KEY, hidden ? '0' : '1');
    } catch {
      // Storage unavailable: the toggle still works for this page view.
    }
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-3 left-3 z-50 rounded-md bg-lca-ink px-3 py-2 font-lca text-xs font-medium text-lca-cream opacity-70 shadow-[0_1px_12px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lca-purple print:hidden"
      >
        Show prototype bar{issueCount > 0 && ` · ${plural(issueCount, 'issue')}`}
      </button>
    );
  }

  return (
    <nav
      ref={barRef}
      aria-label="Prototype navigation"
      className="relative z-50 flex flex-wrap items-center gap-x-4 gap-y-1 bg-lca-ink px-3 py-1.5 font-lca text-xs text-lca-cream antialiased print:hidden"
    >
      <Link to="/" className={`${linkClass} flex items-center gap-2`}>
        <span className="text-[11px] font-semibold tracking-[0.08em] text-lca-cream">LOW / CODE</span>
        <span aria-hidden className="text-lca-cream/30">|</span>
        <span>Prototype home</span>
      </Link>
      {registryIssues.length > 0 && (
        <Link to="/#registry-issues" className={`${badgeClass} bg-lca-lime`}>
          {plural(registryIssues.length, 'registry issue')}
        </Link>
      )}
      {designCount > 0 && (
        <Link to="/#design-check" className={`${badgeClass} bg-lca-purple-light`}>
          {plural(designCount, 'design issue')}
        </Link>
      )}
      <span className="text-lca-cream/60">
        {[userType?.name, info?.flow.name ?? (screen.standalone ? 'Standalone' : undefined)].filter(Boolean).join(' · ')}
      </span>
      <span aria-current="page" className="font-medium text-lca-cream">
        {info && info.step > 0 && `Step ${info.step} of ${info.total} · `}
        {screenLabel(screen)}
      </span>
      <span className="ml-auto flex items-center gap-2">
        {info?.prev && (
          <Link to={hrefFor(info.prev, info.flow)} className={linkClass}>
            ‹ {info.prev.name}
          </Link>
        )}
        {info?.next && (
          <Link to={hrefFor(info.next, info.flow)} className={linkClass}>
            {info.next.name} ›
          </Link>
        )}
        <button type="button" onClick={toggle} className={`${linkClass} text-lca-cream/50`}>
          Hide
        </button>
      </span>
    </nav>
  );
}
