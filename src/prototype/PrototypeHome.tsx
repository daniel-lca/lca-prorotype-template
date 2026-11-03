import { Link } from 'react-router-dom';
import { Note } from '../components/Note';
import { Placeholder } from '../components/Placeholder';
import {
  counts,
  flowScreens,
  flowStartHref,
  flowsFor,
  hrefFor,
  previewViewport,
  screenById,
  shortcuts,
  standaloneScreens,
  userTypes,
  variantsOf,
} from './derive';
import { registry } from './registry';
import { ScreenPreview } from './ScreenPreview';
import type { Flow, Screen, Status } from './types';
import { registryIssues } from './validate';

// Prototype Home: Prototype Flows, All Prototype Screens (visual gallery), Developer shortcuts.
// Everything here is derived from src/prototype/registry.ts. Do not hardcode flows or screens in this file.
// This is prototype tooling: it stays grayscale at every fidelity.

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';
const linkClass = `rounded-sm underline underline-offset-2 hover:text-neutral-600 ${focusRing}`;
const secondaryButtonClass = `inline-flex min-h-10 items-center rounded-sm border border-neutral-900 px-3 text-sm font-semibold hover:bg-neutral-200 ${focusRing}`;
const buttonClass = `inline-flex min-h-10 items-center rounded-sm border border-neutral-900 bg-neutral-900 px-3 text-sm font-semibold text-white hover:bg-neutral-700 ${focusRing}`;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function StatusTag({ status }: { status?: Status }) {
  if (!status) return null;
  return <span className="rounded-sm border border-neutral-300 px-1.5 text-xs text-neutral-600">{status.replace(/-/g, ' ')}</span>;
}

function OpenFlow({ flow, secondary = false }: { flow: Flow; secondary?: boolean }) {
  const href = flowStartHref(flow);
  if (!href) return null;
  return (
    <Link to={href} className={secondary ? secondaryButtonClass : buttonClass}>
      Open flow<span className="sr-only">: {flow.name}</span>
    </Link>
  );
}

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
  return narrow
    ? 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5'
    : 'grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2';
}

function PreviewCard({ screen, step, flow }: GalleryItem & { flow?: Flow }) {
  const state = screen.parentScreenId ? (screen.variant ?? 'state') : undefined;
  const label = state ? `${screen.name}, ${state} state` : screen.name;
  return (
    <li className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {step !== undefined && <span className="text-sm text-neutral-500 tabular-nums">{step}.</span>}
        <h5 className="font-medium">{screen.name}</h5>
        {state && <span className="rounded-sm bg-neutral-200 px-1.5 text-xs text-neutral-700">State: {state}</span>}
        <StatusTag status={screen.status} />
        {screen.shared && <span className="text-xs text-neutral-500">shared</span>}
      </div>
      <ScreenPreview screen={screen} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Link to={hrefFor(screen, flow)} className={`${linkClass} text-sm font-medium`}>
          Open screen<span className="sr-only">: {label}</span>
        </Link>
        <code className="text-xs text-neutral-500 [overflow-wrap:anywhere]">{screen.route}</code>
      </div>
      {screen.description && <p className="text-sm text-neutral-600">{screen.description}</p>}
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

export function PrototypeHome() {
  const types = userTypes();
  const standalone = standaloneGalleryItems();
  const devShortcuts = shortcuts();
  const shortcutGroups = [...new Set(devShortcuts.map((s) => s.group ?? 'General'))];
  const total = counts();
  const isEmpty = registry.flows.length === 0 && registry.screens.length === 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <p className="text-sm text-neutral-500">Prototype home</p>
        <h1 className="text-3xl font-medium">{registry.name}</h1>
        {!isEmpty && (
          <p className="mt-2 text-neutral-600">
            {plural(total.userTypes, 'user type')} · {plural(total.flows, 'flow')} · {plural(total.screens, 'screen')}
            {total.states > 0 && ` · ${plural(total.states, 'state')}`}
          </p>
        )}
      </header>

      {registryIssues.length > 0 && (
        <section aria-labelledby="issues" className="mb-10 border-2 border-neutral-900 p-4">
          <h2 id="issues" className="font-medium">
            Registry issues ({registryIssues.length})
          </h2>
          <p className="text-sm text-neutral-600">Fix these in src/prototype/registry.ts before calling the task done.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm [overflow-wrap:anywhere]">
            {registryIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </section>
      )}

      {isEmpty ? (
        <section className="flex flex-col gap-6">
          <p className="text-neutral-600">
            Nothing is built yet. Start the intake in AI Studio with the prompt in{' '}
            <code className="rounded-sm bg-neutral-200 px-1">KICKOFF_PROMPT.md</code>.
          </p>
          <Placeholder label="Flows and screens appear here" className="h-48" />
          <Note>This page is generated from src/prototype/registry.ts. Register every screen there.</Note>
        </section>
      ) : (
        <>
          <section aria-labelledby="flows" className="mb-16">
            <h2 id="flows" className="mb-6 text-2xl font-medium">
              Prototype flows
            </h2>
            {types.map((type) => (
              <div key={type.id} className="mb-8">
                <h3 className="text-lg font-medium">{type.name}</h3>
                <p className="mb-3 text-sm text-neutral-600">{type.description}</p>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {flowsFor(type.id).map((flow) => {
                    const steps = flowScreens(flow);
                    return (
                      <li key={flow.id} className="flex flex-col gap-3 border border-neutral-300 bg-white p-4">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="font-medium">{flow.name}</h4>
                          <span className="text-sm text-neutral-500">{plural(steps.length, 'step')}</span>
                          <StatusTag status={flow.status} />
                        </div>
                        <p className="text-sm text-neutral-600">{flow.description}</p>
                        <p className="text-sm text-neutral-500">{steps.map((s) => s.name).join(' → ')}</p>
                        <div className="mt-auto">
                          <OpenFlow flow={flow} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="screens" className="mb-16">
            <h2 id="screens" className="mb-6 text-2xl font-medium">
              All prototype screens
            </h2>
            {types.map((type) => (
              <div key={type.id} className="mb-12">
                <h3 className="mb-4 text-lg font-medium">{type.name}</h3>
                {flowsFor(type.id).map((flow) => (
                  <div key={flow.id} className="mb-10 border-l-2 border-neutral-300 pl-4">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-medium">{flow.name}</h4>
                      <OpenFlow flow={flow} secondary />
                    </div>
                    <p className="mb-4 text-sm text-neutral-600">{flow.description}</p>
                    <Gallery items={flowGalleryItems(flow)} flow={flow} />
                  </div>
                ))}
              </div>
            ))}
            {standalone.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-medium">Standalone screens</h3>
                <p className="mb-4 text-sm text-neutral-600">Utility screens that are not part of a user journey.</p>
                <Gallery items={standalone} />
              </div>
            )}
          </section>

          {devShortcuts.length > 0 && (
            <section aria-labelledby="shortcuts">
              <h2 id="shortcuts" className="mb-6 text-2xl font-medium">
                Developer shortcuts
              </h2>
              {shortcutGroups.map((group) => (
                <div key={group} className="mb-6">
                  <h3 className="mb-2 font-medium">{group}</h3>
                  <ul className="space-y-2">
                    {devShortcuts
                      .filter((s) => (s.group ?? 'General') === group)
                      .map((shortcut) => {
                        const screen = screenById(shortcut.screenId);
                        if (!screen) return null;
                        return (
                          <li key={shortcut.id} className="flex flex-wrap items-baseline gap-x-3">
                            <Link to={hrefFor(screen)} className={`${linkClass} font-medium`}>
                              {shortcut.label}
                            </Link>
                            {shortcut.description && <span className="text-sm text-neutral-600">{shortcut.description}</span>}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
