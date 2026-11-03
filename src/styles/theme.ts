import { useEffect, useSyncExternalStore } from 'react';

// Light / Dark / System theme for Mid-fi prototypes whose brief asks for dark mode (needs memorisely.css).
// Call useProductTheme() once in the product shell. While the shell is mounted, it puts "dark" on <body>, so the
// screen and everything rendered in a portal (dialogs, sheets, menus, popovers, toasts) follow the theme.
// Prototype Home and the flow bar use their own lca-* colors, so they never change:
//
//   useProductTheme();
//   <div className="min-h-[calc(100dvh-var(--prototype-bar-height,0px))] bg-background text-foreground">
//
// A theme switcher calls setChoice('light' | 'dark' | 'system') from useTheme(). The choice is saved in
// localStorage and read before the first render, so there is no flash of the wrong theme.

export type ThemeChoice = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'prototype-theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set<() => void>();

function readChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Storage unavailable: fall back to the system preference.
  }
  return 'system';
}

let choice = readChoice();

function subscribe(listener: () => void) {
  listeners.add(listener);
  media.addEventListener('change', listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', listener);
  };
}

export function setThemeChoice(next: ThemeChoice) {
  choice = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable: the choice still applies until reload.
  }
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  const current = useSyncExternalStore(subscribe, () => choice);
  const prefersDark = useSyncExternalStore(subscribe, () => media.matches);
  const resolved: 'light' | 'dark' = current === 'system' ? (prefersDark ? 'dark' : 'light') : current;
  return { choice: current, setChoice: setThemeChoice, resolved, themeClass: resolved === 'dark' ? 'dark' : '' };
}

/** Call once in the product shell: applies the theme to <body> while the shell is mounted. */
export function useProductTheme() {
  const theme = useTheme();
  useEffect(() => {
    document.body.classList.toggle('dark', theme.resolved === 'dark');
    return () => document.body.classList.remove('dark');
  }, [theme.resolved]);
  return theme;
}
