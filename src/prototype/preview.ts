// Preview mode: a screen route loaded with ?preview=1 inside a Prototype Home gallery iframe.
// The screen renders without the flow bar, cannot take focus, and does not scroll, so the gallery shows a
// static, contained picture of the real component (modals and drawers stay inside their own preview).

export const PREVIEW_PARAM = 'preview';

export const isPreview = new URLSearchParams(window.location.search).has(PREVIEW_PARAM);

/** Call once before rendering. */
export function setUpPreviewMode() {
  if (!isPreview) return;
  const root = document.documentElement;
  root.dataset.preview = '';
  root.style.overflow = 'hidden';
  root.inert = true;
}

export function previewSrc(route: string) {
  return `${route}?${PREVIEW_PARAM}=1`;
}
