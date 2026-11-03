import type { ReactNode } from 'react';

// For mobile-only prototypes: full screen on phones, a 390px device frame on wider screens.
// Heights subtract the prototype bar (--prototype-bar-height) so the page does not scroll by the bar's height.
const fullHeight = 'min-h-[calc(100dvh-var(--prototype-bar-height,0px))]';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className={`${fullHeight} md:flex md:items-center md:justify-center md:bg-neutral-200 md:p-8`}>
      <div className={`${fullHeight} bg-white md:h-[844px] md:min-h-0 md:w-[390px] md:overflow-y-auto md:rounded-[2.5rem] md:border-8 md:border-neutral-800`}>
        {children}
      </div>
    </div>
  );
}
