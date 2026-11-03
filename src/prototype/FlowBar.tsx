import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { contextFlow, FLOW_PARAM, hrefFor, stepInfo } from './derive';
import { registry } from './registry';
import type { Screen } from './types';
import { registryIssues } from './validate';

// Thin prototype-tooling bar above every registered screen: where am I, previous/next step, back to home.
// It is tooling, not product UI, so it stays grayscale at every fidelity and can be collapsed for demos.
// It publishes its height as --prototype-bar-height so full-height app shells and sticky headers can sit below it.

const STORAGE_KEY = 'prototype-flowbar-hidden';
const BAR_HEIGHT_VAR = '--prototype-bar-height';
const linkClass =
  'rounded-sm px-1 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white';

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

export function FlowBar({ screen }: { screen: Screen }) {
  const [hidden, setHidden] = useState(readHidden);
  const [params] = useSearchParams();
  const barRef = useRef<HTMLElement>(null);
  const flow = contextFlow(screen, params.get(FLOW_PARAM));
  const info = stepInfo(screen, flow);
  const userType = registry.userTypes.find((u) => u.id === (flow?.userTypeId ?? screen.userTypeId));

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
        className="fixed bottom-3 left-3 z-50 rounded-sm bg-neutral-900 px-3 py-2 text-xs text-white opacity-60 hover:opacity-100 focus-visible:opacity-100 print:hidden"
      >
        Show prototype bar{registryIssues.length > 0 && ` (${registryIssues.length} registry issues)`}
      </button>
    );
  }

  return (
    <nav
      ref={barRef}
      aria-label="Prototype navigation"
      className="sticky top-0 z-50 flex flex-wrap items-center gap-x-4 gap-y-1 bg-neutral-900 px-3 py-1.5 text-xs text-white print:hidden"
    >
      <Link to="/" className={linkClass}>
        ← Prototype home
      </Link>
      {registryIssues.length > 0 && (
        <Link to="/" className="rounded-sm bg-white px-1.5 font-semibold text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white">
          {registryIssues.length} registry {registryIssues.length === 1 ? 'issue' : 'issues'}
        </Link>
      )}
      <span className="text-neutral-400">
        {[userType?.name, info?.flow.name ?? (screen.standalone ? 'Standalone' : undefined)].filter(Boolean).join(' · ')}
      </span>
      <span aria-current="page" className="font-medium">
        {info && info.step > 0 && `Step ${info.step} of ${info.total}: `}
        {screen.parentScreenId ? `${screen.name} (${screen.variant ?? 'state'})` : screen.name}
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
        <button type="button" onClick={toggle} className={`${linkClass} text-neutral-400`}>
          Hide
        </button>
      </span>
    </nav>
  );
}
