import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDesignIssues, type DesignIssue } from './designCheck';
import {
  counts,
  flowScreens,
  flowStartHref,
  flowsFor,
  hrefFor,
  previewViewport,
  screenById,
  screenLabel,
  shortcuts,
  standaloneScreens,
  stateLabel,
  userTypes,
  variantsOf,
} from './derive';
import { registry } from './registry';
import { ScreenPreview } from './ScreenPreview';
import type { Flow, Screen, Status } from './types';
import { registryIssues } from './validate';

// Prototype Home: Prototype Flows, All Prototype Screens (visual gallery), Developer shortcuts, and checks.
// Everything here is derived from src/prototype/registry.ts. Do not hardcode flows or screens in this file.
// This is prototype tooling: it uses the LowCode Agency brand (src/prototype/tooling.css) at every fidelity
// and never takes the product's styling.

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lca-purple';
const primaryButton = `inline-flex h-9 items-center rounded-md bg-lca-purple px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-lca-purple-dark ${focusRing}`;
const secondaryButton = `inline-flex h-9 items-center rounded-md px-4 text-sm font-semibold text-lca-purple-text ring-1 ring-lca-purple/40 ring-inset transition-colors duration-200 hover:bg-lca-purple-pale ${focusRing}`;
const textLink = `rounded-sm font-medium text-lca-purple-text underline-offset-4 hover:underline ${focusRing}`;
const tagClass = 'inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]';

// Brand "1px rule" grid: cells share 1px dividers; empty cells in a partial row stay cream.
const ruleGrid = 'grid gap-px overflow-hidden rounded-lg p-px';
const ruleCell = 'bg-lca-cream outline outline-1 outline-lca-rule';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function Eyebrow({ children, tone = 'purple' }: { children: ReactNode; tone?: 'purple' | 'lime' }) {
  const color = tone === 'lime' ? 'text-lca-lime' : 'text-lca-purple-text';
  const line = tone === 'lime' ? 'bg-lca-lime' : 'bg-lca-purple';
  return (
    <p className={`mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>
      <span aria-hidden className={`h-px w-6 ${line}`} />
      {children}
    </p>
  );
}

function StatusTag({ status }: { status?: Status }) {
  if (!status) return null;
  return <span className={`${tagClass} bg-lca-purple-pale text-lca-purple-text`}>{status.replace(/-/g, ' ')}</span>;
}

function StepNumber({ n }: { n?: number }) {
  if (n === undefined) return null;
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-lca-purple-pale text-xs font-semibold text-lca-purple-text tabular-nums">
      {n}
    </span>
  );
}

function OpenFlow({ flow, secondary = false }: { flow: Flow; secondary?: boolean }) {
  const href = flowStartHref(flow);
  if (!href) return null;
  return (
    <Link to={href} className={secondary ? secondaryButton : primaryButton}>
      Open flow<span className="sr-only">: {flow.name}</span>
    </Link>
  );
}

// ---------------------------------------------------------------------------------------------------------
// Top bar, hero, footer

function TopBar({ links }: { links: { href: string; label: string }[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-lca-rule bg-lca-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-6 px-6 sm:px-12">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-lca-ink">
          LOW / CODE
          <span aria-hidden className="h-4 w-px bg-lca-rule" />
          <span className="font-medium text-lca-muted">Prototype home</span>
        </p>
        <nav aria-label="Prototype home sections" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-sm text-[11px] font-medium uppercase tracking-[0.08em] text-lca-muted transition-colors duration-200 hover:text-lca-purple-text ${focusRing}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ designIssues }: { designIssues?: DesignIssue[] }) {
  const total = counts();
  const stats = [
    { value: total.userTypes, label: total.userTypes === 1 ? 'User type' : 'User types' },
    { value: total.flows, label: total.flows === 1 ? 'Flow' : 'Flows' },
    { value: total.screens, label: total.screens === 1 ? 'Screen' : 'Screens' },
    { value: total.states, label: total.states === 1 ? 'Directly openable state' : 'Directly openable states' },
  ];
  return (
    <section aria-labelledby="prototype-title" className="mb-16">
      <Eyebrow>Prototype · {registry.fidelity.replace('lo-fi-plus', 'lo-fi+')}</Eyebrow>
      <h1 id="prototype-title" className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] text-lca-ink">
        {registry.name}
      </h1>
      {registry.description && <p className="mt-4 max-w-2xl text-[17px] leading-[1.7] text-lca-body">{registry.description}</p>}
      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-lca-rule ring-1 ring-lca-rule lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 bg-lca-cream px-5 py-5">
            <dt className="text-[13px] text-lca-muted">{stat.label}</dt>
            <dd className="order-first text-[40px] leading-none font-bold tracking-[-0.02em] text-lca-ink tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <ChecksSummary designIssues={designIssues} />
    </section>
  );
}

function ChecksSummary({ designIssues }: { designIssues?: DesignIssue[] }) {
  const items: { label: string; ok: boolean; text: string; href?: string }[] = [
    {
      label: 'Registry',
      ok: registryIssues.length === 0,
      text: registryIssues.length === 0 ? 'no issues' : plural(registryIssues.length, 'issue'),
      href: '#registry-issues',
    },
  ];
  if (import.meta.env.DEV) {
    items.push({
      label: 'Design check',
      ok: designIssues?.length === 0,
      text: designIssues === undefined ? 'running…' : designIssues.length === 0 ? 'no issues' : plural(designIssues.length, 'issue'),
      href: '#design-check',
    });
  }
  return (
    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-lca-muted">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden className={`size-2 rounded-full ${item.ok ? 'bg-lca-purple' : 'bg-lca-ink'}`} />
          <span className="font-medium text-lca-body">{item.label}:</span>
          {item.ok || !item.href ? item.text : <a href={item.href} className={textLink}>{item.text}</a>}
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="border-t border-lca-rule">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 py-6 text-[11px] text-lca-muted sm:px-12">
        <span className="font-semibold tracking-[0.08em] text-lca-ink">LOW / CODE</span>
        <span>Prototype home · {registry.name}</span>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------------------------------------
// Checks

function RegistryIssues() {
  if (registryIssues.length === 0) return null;
  return (
    <section id="registry-issues" aria-labelledby="registry-issues-title" className="mb-12 scroll-mt-20 rounded-lg bg-lca-ink p-6 text-lca-cream sm:p-8">
      <Eyebrow tone="lime">Fix before the task is done</Eyebrow>
      <h2 id="registry-issues-title" className="text-xl font-semibold">
        Registry issues ({registryIssues.length})
      </h2>
      <p className="mt-1 text-sm text-lca-cream/70">Fix these in src/prototype/registry.ts.</p>
      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-lca-cream/90 [overflow-wrap:anywhere]">
        {registryIssues.map((issue) => (
          <li key={issue}>{issue}</li>
        ))}
      </ul>
    </section>
  );
}

function DesignCheck({ issues }: { issues?: DesignIssue[] }) {
  if (!import.meta.env.DEV || !issues || issues.length === 0) return null;
  const byFile = new Map<string, DesignIssue[]>();
  for (const issue of issues) byFile.set(issue.file, [...(byFile.get(issue.file) ?? []), issue]);
  return (
    <section id="design-check" aria-labelledby="design-check-title" className="mb-12 scroll-mt-20 rounded-lg bg-lca-white p-6 ring-1 ring-lca-rule sm:p-8">
      <Eyebrow>Development only</Eyebrow>
      <h2 id="design-check-title" className="text-xl font-semibold text-lca-ink">
        Design check ({issues.length})
      </h2>
      <p className="mt-1 max-w-3xl text-sm text-lca-body">
        Classes in screens that break the design rules for <strong className="font-semibold">{registry.fidelity}</strong>, with
        what to use instead. Fix them before calling a screen done. This list never appears in the deployed prototype.
      </p>
      <div className="mt-5 divide-y divide-lca-rule border-y border-lca-rule">
        {[...byFile].map(([file, fileIssues]) => (
          <details key={file} className="group py-3">
            <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm ${focusRing}`}>
              <code className="font-medium text-lca-ink [overflow-wrap:anywhere]">{file}</code>
              <span className="flex shrink-0 items-center gap-2 text-lca-muted">
                {plural(fileIssues.length, 'issue')}
                <span aria-hidden className="transition-transform duration-200 group-open:rotate-90">›</span>
              </span>
            </summary>
            <ul className="mt-3 space-y-1.5 text-[13px]">
              {fileIssues.map((issue, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[3.5rem_minmax(0,14rem)_minmax(0,1fr)]">
                  <span className="text-lca-muted tabular-nums">L{issue.line}</span>
                  <code className="text-lca-ink [overflow-wrap:anywhere]">{issue.found}</code>
                  <span className="col-start-2 text-lca-body sm:col-start-auto">→ {issue.fix}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------
// Prototype flows

function FlowCard({ flow }: { flow: Flow }) {
  const steps = flowScreens(flow);
  const shown = steps.slice(0, 6);
  return (
    <li className={`flex flex-col gap-4 p-6 transition-colors duration-200 hover:bg-lca-white ${ruleCell}`}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-lg font-semibold text-lca-ink">{flow.name}</h4>
          <StatusTag status={flow.status} />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-lca-body">{flow.description}</p>
      </div>
      <ol className="space-y-2">
        {shown.map((screen, i) => (
          <li key={screen.id} className="flex items-center gap-2.5 text-sm text-lca-body">
            <StepNumber n={i + 1} />
            <span className="truncate">{screen.name}</span>
          </li>
        ))}
        {steps.length > shown.length && <li className="pl-8 text-sm text-lca-muted">+{steps.length - shown.length} more steps</li>}
      </ol>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        <OpenFlow flow={flow} />
        <a href={`#flow-${flow.id}`} className={`text-sm ${textLink}`}>
          See screens
        </a>
      </div>
    </li>
  );
}

function FlowsSection() {
  return (
    <section id="flows" aria-labelledby="flows-title" className="mb-20 scroll-mt-20">
      <Eyebrow>Prototype flows</Eyebrow>
      <h2 id="flows-title" className="mb-8 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-lca-ink">
        User journeys
      </h2>
      <div className="space-y-12">
        {userTypes().map((type) => (
          <div key={type.id}>
            <h3 className="text-xl font-semibold text-lca-ink">{type.name}</h3>
            <p className="mt-1 mb-5 text-sm text-lca-muted">{type.description}</p>
            <ul className={`${ruleGrid} md:grid-cols-2 lg:grid-cols-3`}>
              {flowsFor(type.id).map((flow) => (
                <FlowCard key={flow.id} flow={flow} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------
// All prototype screens (visual gallery)

interface GalleryItem {
  screen: Screen;
  step?: number;
}

/** Journey screens in flow order, each followed by its variants (same step number, no extra steps). */
function flowGalleryItems(flow: Flow): GalleryItem[] {
  return flowScreens(flow).flatMap((screen, i) => [
    { screen, step: i + 1 },
    ...variantsOf(screen.id).map((variant) => ({ screen: variant, step: i + 1 })),
  ]);
}

function standaloneGalleryItems(): GalleryItem[] {
  return standaloneScreens().flatMap((screen) => [{ screen }, ...variantsOf(screen.id).map((variant) => ({ screen: variant }))]);
}

/** Phone-sized previews get more columns; desktop-sized previews get fewer, so both stay legible. */
function galleryGridClass(items: GalleryItem[]) {
  const narrow = items.every(({ screen }) => previewViewport(screen).width < 768);
  return narrow ? 'grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5' : 'grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2';
}

function PreviewCard({ screen, step, flow }: GalleryItem & { flow?: Flow }) {
  const state = stateLabel(screen);
  const href = hrefFor(screen, flow);
  const parent = screen.parentScreenId ? screenById(screen.parentScreenId) : undefined;
  const title = parent?.name ?? screen.name;
  const showStatus = screen.status && screen.status !== flow?.status;
  return (
    <li className="flex min-w-0 flex-col">
      {/* Fixed-height label block, so previews in one row line up even when names wrap. */}
      <div className="mb-3 flex h-12 items-start gap-2.5">
        <StepNumber n={step} />
        <div className="min-w-0">
          <h5 className="truncate text-sm font-semibold text-lca-ink" title={screenLabel(screen)}>
            {title}
          </h5>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {state && <span className={`${tagClass} bg-lca-ink text-lca-cream`}>{state}</span>}
            {screen.shared && <span className={`${tagClass} bg-lca-gray text-lca-body`}>shared</span>}
            {showStatus && <StatusTag status={screen.status} />}
          </div>
        </div>
      </div>
      {/* The whole thumbnail opens the screen. The visible "Open screen" link below is the accessible one. */}
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden
        className="group relative block overflow-hidden rounded-md ring-1 ring-lca-rule transition-shadow duration-200 hover:ring-2 hover:ring-lca-purple"
      >
        <ScreenPreview screen={screen} />
        <span className="pointer-events-none absolute right-2 bottom-2 rounded-sm bg-lca-ink px-2 py-1 text-[11px] font-medium text-lca-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Open screen ↗
        </span>
      </Link>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Link to={href} className={`text-sm ${textLink}`}>
          Open screen<span className="sr-only">: {screenLabel(screen)}</span>
        </Link>
        <code className="text-[11px] text-lca-muted [overflow-wrap:anywhere]">{screen.route}</code>
      </div>
      {screen.description && <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-lca-muted">{screen.description}</p>}
    </li>
  );
}

function Gallery({ items, flow }: { items: GalleryItem[]; flow?: Flow }) {
  return (
    <ul className={galleryGridClass(items)}>
      {items.map((item) => (
        <PreviewCard key={item.screen.id} {...item} flow={flow} />
      ))}
    </ul>
  );
}

function ScreensSection() {
  const standalone = standaloneGalleryItems();
  return (
    <section id="screens" aria-labelledby="screens-title" className="mb-20 scroll-mt-20">
      <Eyebrow>All prototype screens</Eyebrow>
      <h2 id="screens-title" className="mb-8 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-lca-ink">
        Every screen and state
      </h2>
      <div className="space-y-16">
        {userTypes().map((type) => (
          <div key={type.id} className="space-y-12">
            {flowsFor(type.id).map((flow) => (
              <div key={flow.id} id={`flow-${flow.id}`} className="scroll-mt-20">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-lca-rule pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lca-purple-text">{type.name}</p>
                    <h3 className="mt-1 text-xl font-semibold text-lca-ink">{flow.name}</h3>
                    <p className="mt-1 max-w-3xl text-sm text-lca-body">{flow.description}</p>
                  </div>
                  <OpenFlow flow={flow} secondary />
                </div>
                <Gallery items={flowGalleryItems(flow)} flow={flow} />
              </div>
            ))}
          </div>
        ))}
        {standalone.length > 0 && (
          <div>
            <div className="mb-6 border-b border-lca-rule pb-4">
              <h3 className="text-xl font-semibold text-lca-ink">Standalone screens</h3>
              <p className="mt-1 text-sm text-lca-body">Utility screens that are not part of a user journey.</p>
            </div>
            <Gallery items={standalone} />
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------
// Developer shortcuts

function ShortcutsSection() {
  const devShortcuts = shortcuts();
  if (devShortcuts.length === 0) return null;
  const groups = [...new Set(devShortcuts.map((s) => s.group ?? 'General'))];
  return (
    <section id="shortcuts" aria-labelledby="shortcuts-title" className="mb-20 scroll-mt-20">
      <Eyebrow>Developer shortcuts</Eyebrow>
      <h2 id="shortcuts-title" className="mb-8 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-lca-ink">
        Jump to a state
      </h2>
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group}>
            <h3 className="mb-3 text-sm font-semibold text-lca-ink">{group}</h3>
            <ul className={`${ruleGrid} sm:grid-cols-2 lg:grid-cols-3`}>
              {devShortcuts
                .filter((s) => (s.group ?? 'General') === group)
                .map((shortcut) => {
                  const screen = screenById(shortcut.screenId);
                  if (!screen) return null;
                  return (
                    <li key={shortcut.id} className={ruleCell}>
                      <Link to={hrefFor(screen)} className={`block h-full p-4 transition-colors duration-200 hover:bg-lca-white ${focusRing}`}>
                        <span className="text-sm font-semibold text-lca-purple-text">{shortcut.label}</span>
                        {shortcut.description && <span className="mt-1 block text-[13px] text-lca-muted">{shortcut.description}</span>}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------
// Empty state and page

function EmptyState() {
  const steps = [
    'Import this repository into Google AI Studio (Build). It reads the guidelines and starts the intake.',
    'Upload a PRD or answer the intake questions.',
    'Confirm the brief and say "go". Flows and screens appear here as they are built.',
  ];
  return (
    <section aria-labelledby="empty-title" className="rounded-lg bg-lca-white p-8 ring-1 ring-lca-rule">
      <Eyebrow>Getting started</Eyebrow>
      <h2 id="empty-title" className="text-xl font-semibold text-lca-ink">
        Nothing is built yet
      </h2>
      <ol className="mt-5 space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-lca-body">
            <StepNumber n={i + 1} />
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[13px] text-lca-muted">This page is generated from src/prototype/registry.ts.</p>
    </section>
  );
}

/** Scroll to #registry-issues / #design-check when arriving from a flow bar badge. */
function useScrollToHash(ready: boolean) {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash || !ready) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash, ready]);
}

export function PrototypeHome() {
  const designIssues = useDesignIssues();
  const isEmpty = registry.flows.length === 0 && registry.screens.length === 0;
  useScrollToHash(designIssues !== undefined);

  const links = isEmpty
    ? []
    : [
        { href: '#flows', label: 'Flows' },
        { href: '#screens', label: 'Screens' },
        ...(shortcuts().length > 0 ? [{ href: '#shortcuts', label: 'Shortcuts' }] : []),
      ];

  return (
    <div className="min-h-dvh bg-lca-cream font-lca text-lca-body antialiased">
      <TopBar links={links} />
      <main className="mx-auto max-w-[1200px] px-6 py-14 sm:px-12 sm:py-20">
        <Hero designIssues={designIssues} />
        <RegistryIssues />
        <DesignCheck issues={designIssues} />
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <FlowsSection />
            <ScreensSection />
            <ShortcutsSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
