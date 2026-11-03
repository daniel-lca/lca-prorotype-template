import { registry } from './registry';
import type { Flow, Screen, UserType, Viewport } from './types';

// Read-only views over the registry. Counts, step numbers, and grouping are always computed, never stored.

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export const DEFAULT_PREVIEW_VIEWPORT: Viewport = { width: 1440, height: 900 };

/** Query parameter that keeps the current flow when a shared screen is opened from a flow that does not own it. */
export const FLOW_PARAM = 'flow';

export const screenById = (id: string) => registry.screens.find((s) => s.id === id);
export const flowById = (id: string) => registry.flows.find((f) => f.id === id);

export function userTypes(): UserType[] {
  return [...registry.userTypes].sort(byOrder);
}

export function flowsFor(userTypeId: string): Flow[] {
  return registry.flows.filter((f) => f.userTypeId === userTypeId).sort(byOrder);
}

export function flowScreens(flow: Flow): Screen[] {
  return flow.screenIds.map(screenById).filter((s): s is Screen => Boolean(s));
}

export function variantsOf(screenId: string): Screen[] {
  return registry.screens.filter((s) => s.parentScreenId === screenId);
}

export function standaloneScreens(): Screen[] {
  return registry.screens.filter((s) => s.standalone);
}

export function shortcuts() {
  return [...registry.shortcuts].sort(byOrder);
}

/** Journey screens and standalone screens. Variants are counted separately as states. */
export function counts() {
  const states = registry.screens.filter((s) => s.parentScreenId).length;
  return { userTypes: registry.userTypes.length, flows: registry.flows.length, screens: registry.screens.length - states, states };
}

/** "no-colleagues" -> "no colleagues". */
export const humanize = (value: string) => value.replace(/[-_]+/g, ' ').trim();

/** State label of a variant ("no colleagues"), or undefined for a normal screen. */
export function stateLabel(screen: Screen): string | undefined {
  return screen.parentScreenId ? humanize(screen.variant ?? 'state') : undefined;
}

/**
 * Display label. A variant is shown as "<parent name> · <state>", so its own name never repeats the state.
 * Example: "Choose colleague · no colleagues".
 */
export function screenLabel(screen: Screen): string {
  const state = stateLabel(screen);
  if (!state) return screen.name;
  const parent = screen.parentScreenId ? screenById(screen.parentScreenId) : undefined;
  return `${parent?.name ?? screen.name} · ${state}`;
}

export function previewViewport(screen: Screen): Viewport {
  return screen.previewViewport ?? registry.previewViewport ?? DEFAULT_PREVIEW_VIEWPORT;
}

/** The screen that holds the step position: the screen itself, or the parent of a variant. */
const anchorId = (screen: Screen) => screen.parentScreenId ?? screen.id;

/**
 * The flow a screen is being viewed in. A shared screen keeps the flow named in ?flow= when that flow lists it;
 * otherwise the screen's own flow is used.
 */
export function contextFlow(screen: Screen, flowParam?: string | null): Flow | undefined {
  if (flowParam) {
    const flow = flowById(flowParam);
    if (flow?.screenIds.includes(anchorId(screen))) return flow;
  }
  return screen.flowId ? flowById(screen.flowId) : undefined;
}

/** Route to open `target` without losing the current flow. Adds ?flow= only when the flow does not own the target. */
export function hrefFor(target: Screen, flow?: Flow): string {
  if (flow && flow.id !== target.flowId && flow.screenIds.includes(anchorId(target))) {
    return `${target.route}?${FLOW_PARAM}=${encodeURIComponent(flow.id)}`;
  }
  return target.route;
}

export function flowStartHref(flow: Flow): string | undefined {
  const start = screenById(flow.startScreenId);
  return start && hrefFor(start, flow);
}

/** Where a screen sits in a flow (its own flow by default). Variants report their parent's step. */
export function stepInfo(screen: Screen, flow: Flow | undefined = contextFlow(screen)) {
  if (!flow) return undefined;
  const index = flow.screenIds.indexOf(anchorId(screen));
  const prev = index > 0 ? screenById(flow.screenIds[index - 1]) : undefined;
  const next = index >= 0 && index < flow.screenIds.length - 1 ? screenById(flow.screenIds[index + 1]) : undefined;
  return { flow, step: index + 1, total: flow.screenIds.length, prev, next };
}
