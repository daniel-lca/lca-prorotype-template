import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { PortalContainerProvider } from '@/lib/portal';

// For mobile-only screens: full screen on phones, a 390 × 844 device mockup on wider screens.
// - Dialogs, sheets, menus, popovers, and toasts open INSIDE the mockup: the device box is the container for the
//   components' overlays (src/lib/portal.tsx), and its transform makes fixed-position overlays stay inside it.
// - The content scrolls inside the device without a visible scrollbar, like a phone.
// - Heights subtract the prototype bar (--prototype-bar-height) so the page does not scroll by the bar's height.

const fullHeight = 'min-h-[calc(100dvh-var(--prototype-bar-height,0px))]';

// While a PhoneFrame is on screen, App hides its page-level toaster and the frame shows its own.
let mountedFrames = 0;
// The device box of the frame on screen. SystemAlert renders into it even when a variant places the alert next to
// the framed screen instead of inside it.
let currentDevice: HTMLDivElement | null = null;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const notify = () => listeners.forEach((listener) => listener());

export function usePhoneFrameMounted() {
  return useSyncExternalStore(subscribe, () => mountedFrames > 0);
}

export function usePhoneFrameDevice() {
  return useSyncExternalStore(subscribe, () => currentDevice);
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    mountedFrames += 1;
    notify();
    return () => {
      mountedFrames -= 1;
      notify();
    };
  }, []);

  useEffect(() => {
    if (!device) return;
    currentDevice = device;
    notify();
    return () => {
      if (currentDevice === device) currentDevice = null;
      notify();
    };
  }, [device]);

  return (
    <div className={`${fullHeight} md:flex md:items-center md:justify-center md:bg-neutral-200 md:p-8`}>
      <div
        ref={setDevice}
        className="relative bg-background md:h-[844px] md:w-[390px] md:transform-gpu md:overflow-hidden md:rounded-[2.5rem] md:border-8 md:border-neutral-800 md:[&_[data-slot=alert-dialog-content]]:max-w-[calc(100%-2rem)] md:[&_[data-slot=dialog-content]]:max-w-[calc(100%-2rem)]"
      >
        <div className={`${fullHeight} no-scrollbar md:h-full md:min-h-0 md:overflow-y-auto`}>
          <PortalContainerProvider value={device}>{children}</PortalContainerProvider>
        </div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
