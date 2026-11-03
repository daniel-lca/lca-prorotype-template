import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams, type LinkProps } from 'react-router-dom';
import { contextFlow, FLOW_PARAM, hrefFor, screenById } from './derive';
import type { Screen } from './types';

// Links between screens. Screens link by screen ID, never by route string:
//   <ScreenLink to="customer-booking-confirm">Confirm booking</ScreenLink>
//   const goTo = useGoToScreen(); goTo('customer-booking-confirm');
// The route comes from the registry, so route changes never break links, and a shared screen keeps the
// flow the reviewer is in (?flow=).

const CurrentScreenContext = createContext<Screen | undefined>(undefined);

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

/** Resolves a screen ID to the route to open, keeping the current flow. Returns undefined for unknown IDs. */
export function useScreenHref() {
  const flow = useCurrentFlow();
  return useCallback(
    (screenId: string) => {
      const target = screenById(screenId);
      if (!target) {
        console.error(`Unknown screen ID "${screenId}". Use an ID from src/prototype/registry.ts.`);
        return undefined;
      }
      return hrefFor(target, flow);
    },
    [flow],
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
};

export function ScreenLink({ to, children, className, ...rest }: ScreenLinkProps) {
  const href = useScreenHref()(to);
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
