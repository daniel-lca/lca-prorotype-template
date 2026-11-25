import { registry } from './registry';
import type { Fidelity, Language, Status } from './types';

// Text of the prototype tooling (Prototype Home, flow bar, "not found" page, tab titles) in each UI language.
// The language comes from registry.language (project setup, guidelines/01-intake-questions.md).
// To add a language: add it to Language in types.ts and add one complete entry here.

interface ToolingStrings {
  prototypeHome: string;
  homeSections: string;
  navFlows: string;
  navScreens: string;
  navShortcuts: string;
  prototypeOf: (fidelity: string) => string;
  fidelity: Record<Fidelity, string>;
  status: Record<Status, string>;
  userTypes: (n: number) => string;
  flows: (n: number) => string;
  screens: (n: number) => string;
  states: (n: number) => string;
  registry: string;
  designCheck: string;
  noIssues: string;
  checking: string;
  issues: (n: number) => string;
  registryIssuesEyebrow: string;
  registryIssuesTitle: (n: number) => string;
  registryIssuesHint: string;
  designCheckEyebrow: string;
  designCheckTitle: (n: number) => string;
  designCheckIntroBefore: string;
  designCheckIntroAfter: string;
  flowsEyebrow: string;
  flowsTitle: string;
  openFlow: string;
  seeScreens: string;
  moreSteps: (n: number) => string;
  screensEyebrow: string;
  screensTitle: string;
  openScreen: string;
  shared: string;
  standaloneTitle: string;
  standaloneDescription: string;
  shortcutsEyebrow: string;
  shortcutsTitle: string;
  emptyEyebrow: string;
  emptyTitle: string;
  emptySteps: string[];
  emptyFootnote: string;
  flowBarLabel: string;
  showBar: string;
  registryIssueBadge: (n: number) => string;
  designIssueBadge: (n: number) => string;
  standalone: string;
  step: (step: number, total: number) => string;
  hide: string;
  notFoundTitle: string;
  notFoundBody: string;
  goHome: string;
  notInPrototype: string;
}

const count = (n: number, one: string, many: string) => (n === 1 ? one : many);

const en: ToolingStrings = {
  prototypeHome: 'Prototype home',
  homeSections: 'Prototype home sections',
  navFlows: 'Flows',
  navScreens: 'Screens',
  navShortcuts: 'Shortcuts',
  prototypeOf: (fidelity) => `Prototype - ${fidelity}`,
  fidelity: { 'lo-fi': 'lo-fi', 'lo-fi-plus': 'lo-fi+', 'mid-fi': 'mid-fi' },
  status: {
    planned: 'planned',
    draft: 'draft',
    'in-progress': 'in progress',
    'ready-for-review': 'ready for review',
    approved: 'approved',
    deprecated: 'deprecated',
  },
  userTypes: (n) => count(n, 'User type', 'User types'),
  flows: (n) => count(n, 'Flow', 'Flows'),
  screens: (n) => count(n, 'Screen', 'Screens'),
  states: (n) => count(n, 'Directly openable state', 'Directly openable states'),
  registry: 'Registry',
  designCheck: 'Design check',
  noIssues: 'no issues',
  checking: 'running…',
  issues: (n) => `${n} ${count(n, 'issue', 'issues')}`,
  registryIssuesEyebrow: 'Fix before the task is done',
  registryIssuesTitle: (n) => `Registry issues (${n})`,
  registryIssuesHint: 'Fix these in src/prototype/registry.ts.',
  designCheckEyebrow: 'Development only',
  designCheckTitle: (n) => `Design check (${n})`,
  designCheckIntroBefore: 'Classes in screens that break the design rules for',
  designCheckIntroAfter:
    ', with what to use instead. Fix them before calling a screen done. This list never appears in the deployed prototype.',
  flowsEyebrow: 'Prototype flows',
  flowsTitle: 'User journeys',
  openFlow: 'Open flow',
  seeScreens: 'See screens',
  moreSteps: (n) => `+${n} more ${count(n, 'step', 'steps')}`,
  screensEyebrow: 'All prototype screens',
  screensTitle: 'Every screen and state',
  openScreen: 'Open screen',
  shared: 'shared',
  standaloneTitle: 'Standalone screens',
  standaloneDescription: 'Utility screens that are not part of a user journey.',
  shortcutsEyebrow: 'Developer shortcuts',
  shortcutsTitle: 'Jump to a state',
  emptyEyebrow: 'Getting started',
  emptyTitle: 'Nothing is built yet',
  emptySteps: [
    'Import this repository into Google AI Studio (Build). It reads the guidelines and starts the intake.',
    'Upload a PRD or answer the intake questions.',
    'Confirm the brief and say "go". Flows and screens appear here as they are built.',
  ],
  emptyFootnote: 'This page is generated from src/prototype/registry.ts.',
  flowBarLabel: 'Prototype navigation',
  showBar: 'Show prototype bar',
  registryIssueBadge: (n) => `${n} registry ${count(n, 'issue', 'issues')}`,
  designIssueBadge: (n) => `${n} design ${count(n, 'issue', 'issues')}`,
  standalone: 'Standalone',
  step: (step, total) => `Step ${step} of ${total}`,
  hide: 'Hide',
  notFoundTitle: 'Screen not found',
  notFoundBody: 'This route is not registered in the prototype.',
  goHome: 'Go to prototype home',
  notInPrototype: 'Not in the prototype yet',
};

const es: ToolingStrings = {
  prototypeHome: 'Inicio del prototipo',
  homeSections: 'Secciones del inicio del prototipo',
  navFlows: 'Flujos',
  navScreens: 'Pantallas',
  navShortcuts: 'Atajos',
  prototypeOf: (fidelity) => `Prototipo de ${fidelity}`,
  fidelity: { 'lo-fi': 'baja fidelidad', 'lo-fi-plus': 'baja fidelidad+', 'mid-fi': 'fidelidad media' },
  status: {
    planned: 'planeado',
    draft: 'borrador',
    'in-progress': 'en curso',
    'ready-for-review': 'listo para revisión',
    approved: 'aprobado',
    deprecated: 'obsoleto',
  },
  userTypes: (n) => count(n, 'Tipo de usuario', 'Tipos de usuario'),
  flows: (n) => count(n, 'Flujo', 'Flujos'),
  screens: (n) => count(n, 'Pantalla', 'Pantallas'),
  states: (n) => count(n, 'Estado con acceso directo', 'Estados con acceso directo'),
  registry: 'Registro',
  designCheck: 'Revisión de diseño',
  noIssues: 'sin problemas',
  checking: 'revisando…',
  issues: (n) => `${n} ${count(n, 'problema', 'problemas')}`,
  registryIssuesEyebrow: 'Corregir antes de cerrar la tarea',
  registryIssuesTitle: (n) => `Problemas del registro (${n})`,
  registryIssuesHint: 'Se corrigen en src/prototype/registry.ts.',
  designCheckEyebrow: 'Solo en desarrollo',
  designCheckTitle: (n) => `Revisión de diseño (${n})`,
  designCheckIntroBefore: 'Clases en las pantallas que rompen las reglas de diseño de',
  designCheckIntroAfter:
    ', con lo que va en su lugar. Se corrigen antes de dar una pantalla por terminada. Esta lista nunca aparece en el prototipo publicado.',
  flowsEyebrow: 'Flujos del prototipo',
  flowsTitle: 'Recorridos por tipo de usuario',
  openFlow: 'Abrir flujo',
  seeScreens: 'Ver pantallas',
  moreSteps: (n) => `+${n} ${count(n, 'paso más', 'pasos más')}`,
  screensEyebrow: 'Todas las pantallas del prototipo',
  screensTitle: 'Cada pantalla y cada estado',
  openScreen: 'Abrir pantalla',
  shared: 'compartida',
  standaloneTitle: 'Pantallas sueltas',
  standaloneDescription: 'Pantallas de apoyo que no forman parte de un recorrido.',
  shortcutsEyebrow: 'Atajos para desarrollo',
  shortcutsTitle: 'Ir directo a un estado',
  emptyEyebrow: 'Para empezar',
  emptyTitle: 'Todavía no hay nada construido',
  emptySteps: [
    'Importa este repositorio en Google AI Studio (Build). Lee las guías y arranca las preguntas iniciales.',
    'Sube un PRD o responde las preguntas iniciales.',
    'Confirma el brief y di "go". Los flujos y las pantallas aparecen aquí conforme se construyen.',
  ],
  emptyFootnote: 'Esta página se genera desde src/prototype/registry.ts.',
  flowBarLabel: 'Navegación del prototipo',
  showBar: 'Mostrar barra del prototipo',
  registryIssueBadge: (n) => `${n} ${count(n, 'problema', 'problemas')} de registro`,
  designIssueBadge: (n) => `${n} ${count(n, 'problema', 'problemas')} de diseño`,
  standalone: 'Pantalla suelta',
  step: (step, total) => `Paso ${step} de ${total}`,
  hide: 'Ocultar',
  notFoundTitle: 'Pantalla no encontrada',
  notFoundBody: 'Esta ruta no está registrada en el prototipo.',
  goHome: 'Ir al inicio del prototipo',
  notInPrototype: 'Todavía no está en el prototipo',
};

const STRINGS: Record<Language, ToolingStrings> = { en, es };

/**
 * Tooling text in registry.language (default English). A function, not a constant: screens import
 * navigation.tsx, which imports this file, while registry.ts is still loading its screens.
 */
export function toolingText(): ToolingStrings {
  return STRINGS[registry.language ?? 'en'];
}

/** Separator between parts of a label, e.g. "Choose colleague - no colleagues". A plain hyphen in every language. */
export const SEPARATOR = ' - ';
