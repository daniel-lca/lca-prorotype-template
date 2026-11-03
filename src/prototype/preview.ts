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
  // A modal dialog escapes the inert root and would pull focus into the preview (away from Prototype Home).
  // Making the dialog inert before it opens leaves nothing to focus; it still renders with its backdrop.
  const showModal = HTMLDialogElement.prototype.showModal;
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.inert = true;
    showModal.call(this);
  };
}

export function previewSrc(route: string) {
  return `${route}?${PREVIEW_PARAM}=1`;
}
