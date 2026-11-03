import { useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { flowById, flowStartHref, screenLabel } from './prototype/derive';
import { FlowBar } from './prototype/FlowBar';
import { CurrentScreenProvider } from './prototype/navigation';
import { isPreview } from './prototype/preview';
import { PrototypeHome } from './prototype/PrototypeHome';
import { registry } from './prototype/registry';
import type { Screen } from './prototype/types';
import { registryIssues } from './prototype/validate';

// Routes are generated from src/prototype/registry.ts. Do not add screen routes by hand here.
//   /                 Prototype Home
//   /flow/:flowId     stable link that opens a flow's start screen
//   <screen.route>    one route per registered screen (?preview=1 renders it for the gallery, without the flow bar)

if (registryIssues.length > 0 && !isPreview) {
  console.error(`Prototype registry issues (${registryIssues.length}):\n${registryIssues.join('\n')}`);
}

function FlowEntry() {
  const { flowId = '' } = useParams();
  const flow = flowById(flowId);
  const href = flow && flowStartHref(flow);
  return href ? <Navigate to={href} replace /> : <NotFound />;
}

function NotFound() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-medium">Screen not found</h1>
      <p className="mt-2 text-neutral-600">This route is not registered in the prototype.</p>
      <Link to="/" className="mt-4 inline-block underline">
        Go to prototype home
      </Link>
    </main>
  );
}

function ScreenRoute({ screen }: { screen: Screen }) {
  const ScreenComponent = screen.component;
  useEffect(() => {
    document.title = `${screenLabel(screen)} · ${registry.name}`;
  }, [screen]);
  return (
    <CurrentScreenProvider screen={screen}>
      {!isPreview && <FlowBar screen={screen} />}
      <ScreenComponent />
    </CurrentScreenProvider>
  );
}

function HomeRoute() {
  useEffect(() => {
    document.title = `Prototype home · ${registry.name}`;
  }, []);
  return <PrototypeHome />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/flow/:flowId" element={<FlowEntry />} />
        {registry.screens.map((screen) => (
          <Route key={screen.id} path={screen.route} element={<ScreenRoute screen={screen} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
