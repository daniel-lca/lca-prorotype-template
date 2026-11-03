import { createContext, useContext } from 'react';

// Where overlays (dialogs, sheets, menus, popovers, selects, tooltips) render. By default Radix renders them at the
// end of <body>. Inside PhoneFrame they render inside the device mockup instead, so a modal never covers the page
// around the phone. The components in src/components/ui read this; screens never need to.

const PortalContainerContext = createContext<HTMLElement | null>(null);

export const PortalContainerProvider = PortalContainerContext.Provider;

/** The element overlays should render into, or undefined for the default (<body>). */
export function usePortalContainer(): HTMLElement | undefined {
  return useContext(PortalContainerContext) ?? undefined;
}
