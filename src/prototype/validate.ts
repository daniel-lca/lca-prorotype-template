import { registry } from './registry';
import type { Registry } from './types';

// Integrity checks from guidelines/05-prototype-schema.md §9. Issues are shown on Prototype Home
// and logged to the console. An empty list is required before a prototype task counts as done.

// Every module in src/screens/ must export at least one component that the registry uses.
const screenModules = import.meta.glob<Record<string, unknown>>('../screens/**/*.tsx', { eager: true });

function duplicates(values: string[]) {
  return [...new Set(values.filter((v, i) => values.indexOf(v) !== i))];
}

export function validateRegistry(r: Registry = registry): string[] {
  const issues: string[] = [];
  const userTypeIds = new Set(r.userTypes.map((u) => u.id));
  const flows = new Map(r.flows.map((f) => [f.id, f]));
  const screens = new Map(r.screens.map((s) => [s.id, s]));

  for (const id of duplicates(r.userTypes.map((u) => u.id))) issues.push(`Duplicate user type ID "${id}"`);
  for (const id of duplicates(r.flows.map((f) => f.id))) issues.push(`Duplicate flow ID "${id}"`);
  for (const id of duplicates(r.screens.map((s) => s.id))) issues.push(`Duplicate screen ID "${id}"`);
  const normalizeRoute = (route: string) => route.toLowerCase().replace(/\/+$/, '');
  for (const route of duplicates(r.screens.map((s) => normalizeRoute(s.route)))) issues.push(`Duplicate route "${route}"`);
  for (const id of duplicates(r.shortcuts.map((s) => s.id))) issues.push(`Duplicate shortcut ID "${id}"`);

  for (const flow of r.flows) {
    if (!userTypeIds.has(flow.userTypeId)) issues.push(`Flow "${flow.id}" references missing user type "${flow.userTypeId}"`);
    if (flow.screenIds.length === 0) issues.push(`Flow "${flow.id}" has no screens`);
    if (!flow.screenIds.includes(flow.startScreenId)) issues.push(`Flow "${flow.id}" start screen "${flow.startScreenId}" is not in its screenIds`);
    for (const id of duplicates(flow.screenIds)) issues.push(`Flow "${flow.id}" lists screen "${id}" twice`);
    for (const id of flow.screenIds) {
      const screen = screens.get(id);
      if (!screen) issues.push(`Flow "${flow.id}" references missing screen "${id}"`);
      else if (screen.parentScreenId) issues.push(`Flow "${flow.id}" lists variant "${id}"; list its parent instead`);
      else if (screen.flowId !== flow.id && !screen.shared) issues.push(`Screen "${id}" is listed in flow "${flow.id}" but belongs to "${screen.flowId}" and is not marked shared`);
    }
  }

  for (const screen of r.screens) {
    if (!screen.route.startsWith('/') || screen.route === '/') issues.push(`Screen "${screen.id}" has invalid route "${screen.route}"`);
    if (/^\/flow(\/|$)/.test(screen.route)) issues.push(`Screen "${screen.id}" route "${screen.route}" uses /flow/, which is reserved for Open flow links`);
    if (/[?#:*]/.test(screen.route)) issues.push(`Screen "${screen.id}" route "${screen.route}" must be a plain path (no ?, #, :param, or *)`);
    if (screen.standalone) {
      if (screen.flowId) issues.push(`Screen "${screen.id}" is standalone but also has flowId "${screen.flowId}"`);
      continue;
    }
    if (!screen.flowId) {
      issues.push(`Screen "${screen.id}" has no flow and is not marked standalone`);
      continue;
    }
    const flow = flows.get(screen.flowId);
    if (!flow) {
      issues.push(`Screen "${screen.id}" references missing flow "${screen.flowId}"`);
      continue;
    }
    if (screen.userTypeId !== flow.userTypeId) issues.push(`Screen "${screen.id}" user type "${screen.userTypeId}" does not match flow "${flow.id}" user type "${flow.userTypeId}"`);
    if (screen.parentScreenId) {
      const parent = screens.get(screen.parentScreenId);
      if (!parent) issues.push(`Variant "${screen.id}" references missing parent "${screen.parentScreenId}"`);
      else if (parent.flowId !== screen.flowId) issues.push(`Variant "${screen.id}" is in a different flow than its parent "${parent.id}"`);
    } else if (!flow.screenIds.includes(screen.id)) {
      issues.push(`Screen "${screen.id}" belongs to flow "${flow.id}" but is missing from its screenIds (orphan)`);
    }
  }

  for (const shortcut of r.shortcuts) {
    if (!screens.has(shortcut.screenId)) issues.push(`Shortcut "${shortcut.id}" references missing screen "${shortcut.screenId}"`);
  }

  const registered = new Set<unknown>(r.screens.map((s) => s.component));
  for (const [path, mod] of Object.entries(screenModules)) {
    if (!Object.values(mod).some((exported) => registered.has(exported))) {
      issues.push(
        `${path.replace('../', 'src/')} is not registered in src/prototype/registry.ts (shared parts belong in src/components/, mock data in src/data/)`,
      );
    }
  }

  return issues;
}

/** The registry is static, so it is checked once per page load. */
export const registryIssues = validateRegistry();
