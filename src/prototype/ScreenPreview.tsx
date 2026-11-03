import { useLayoutEffect, useRef, useState } from 'react';
import { previewViewport } from './derive';
import { previewSrc } from './preview';
import type { Screen } from './types';

// One gallery preview: the registered screen component, loaded from its own route in preview mode inside an
// iframe at the screen's intended viewport, then scaled down to the card width.
// The iframe keeps media queries, modals (showModal), drawers, and fixed elements inside the preview.
// The preview is inert: it cannot be clicked, focused, or scrolled. The Open screen link next to it opens the real one.

export function ScreenPreview({ screen }: { screen: Screen }) {
  const viewport = previewViewport(screen);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(() => setScale(box.clientWidth / viewport.width));
    observer.observe(box);
    return () => observer.disconnect();
  }, [viewport.width]);

  return (
    <div
      ref={boxRef}
      inert
      className="relative w-full overflow-hidden border border-neutral-300 bg-white"
      style={{ aspectRatio: `${viewport.width} / ${viewport.height}` }}
    >
      {scale > 0 && (
        <iframe
          src={previewSrc(screen.route)}
          title={`Preview of ${screen.name}`}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: viewport.width, height: viewport.height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
