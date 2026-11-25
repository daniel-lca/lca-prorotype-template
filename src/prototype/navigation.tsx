import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams, type LinkProps } from 'react-router-dom';
import { contextFlow, FLOW_PARAM, hrefFor, screenById } from './derive';
import { toolingText } from './strings';
import type { Screen } from './types';

// Links between screens. Screens link by screen ID, never by route string:
//   <ScreenLink to="customer-booking-confirm">Confirm booking</ScreenLink>
//   const goTo = useGoToScreen(); goTo('customer-booking-confirm');
// The route comes from the registry, so route changes never break links, and a shared screen keeps the
// flow the reviewer is in (?flow=).
//
// Building in batches: <ScreenLink to="…" optional> stays inert, with no error, while its target screen is not
// registered yet. Remove `optional` when the target screen exists.
//
// Role views: wrap a role's screens in <ScreenRemapContext.Provider value={…}> to send every link to that role's
// copy of the target screen (guidelines/06-screen-flow-rules.md, Role views).

const CurrentScreenContext = createContext<Screen | undefined>(undefined);

/**
 * Maps a target screen ID before it is resolved. The default keeps the ID. A role view returns the ID of its own
 * copy when that copy exists, for example (id) => (screenById(`manager-${id}`) ? `manager-${id}` : id).
 */
export const ScreenRemapContext = createContext<(screenId: string) => string>((screenId) => screenId);

export function CurrentScreenProvider({ screen, children }: { screen: Screen; children: ReactNode }) {
  return <CurrentScreenContext.Provider value={screen}>{children}</CurrentScreenContext.Provider>;
}

export function useCurrentScreen() {
  return useContext(CurrentScreenContext);
}

/** The flow the current screen is being viewed in. */
export function useCurrentFlow() {
  const screen = useCurrentScreen();
  const [params] = useSearchParams();
  return screen ? contextFlow(screen, params.get(FLOW_PARAM)) : undefined;
}

/**
 * Resolves a screen ID to the route to open, keeping the current flow. Returns undefined for unknown IDs.
 * With `optional`, an unknown ID is expected (the screen comes in a later batch) and is not logged as an error.
 */
export function useScreenHref() {
  const flow = useCurrentFlow();
  const remap = useContext(ScreenRemapContext);
  return useCallback(
    (requestedId: string, optional = false) => {
      const screenId = remap(requestedId);
      const target = screenById(screenId);
      if (!target) {
        if (!optional) console.error(`Unknown screen ID "${screenId}". Use an ID from src/prototype/registry.ts.`);
        return undefined;
      }
      return hrefFor(target, flow);
    },
    [flow, remap],
  );
}

export function useGoToScreen() {
  const navigate = useNavigate();
  const toHref = useScreenHref();
  return useCallback(
    (screenId: string) => {
      const href = toHref(screenId);
      if (href) navigate(href);
    },
    [navigate, toHref],
  );
}

type ScreenLinkProps = Omit<LinkProps, 'to'> & {
  /** Screen ID from the registry, e.g. "customer-booking-confirm". */
  to: string;
  /** The target screen is not built yet: render inert, without the dashed "unknown" outline or a console error. */
  optional?: boolean;
};

export function ScreenLink({ to, optional = false, children, className, ...rest }: ScreenLinkProps) {
  const href = useScreenHref()(to, optional);
  if (!href && optional) {
    return (
      <span title={toolingText().notInPrototype} className={className}>
        {children as ReactNode}
      </span>
    );
  }
  if (!href) {
    return (
      <span title={`Unknown screen ID "${to}"`} className={`${className ?? ''} outline-1 outline-neutral-500 outline-dashed`}>
        {children as ReactNode}
      </span>
    );
  }
  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
