import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { usePhoneFrameDevice, usePhoneFrameMounted } from '@/components/PhoneFrame';
import { ScreenLink } from '@/prototype/navigation';
import { PortalContainerProvider, usePortalContainer } from '@/lib/portal';
import { cn } from '@/lib/utils';

// A mock of an operating-system alert (permission request, rating prompt, purchase confirmation).
// The real app cannot design or change these. The mock shows only what the system shows, at every fidelity.
// Rules: guidelines/platform/permissions.md §10.

export type SystemAlertPlatform = 'ios' | 'android' | 'web';

export interface SystemAlertAction {
  /** Button text exactly as the system shows it, e.g. "Allow While Using App". */
  label: string;
  /** Screen ID the button opens. */
  to: string;
}

interface SystemAlertProps {
  platform?: SystemAlertPlatform;
  title: string;
  message?: string;
  /** System buttons, top to bottom (iOS shows two buttons side by side). */
  actions: SystemAlertAction[];
}

const platformLabel: Record<SystemAlertPlatform, string> = {
  ios: 'iOS system alert',
  android: 'Android system dialog',
  web: 'Browser prompt',
};

const focusRing = 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring';

export function SystemAlert(props: SystemAlertProps) {
  // Inside a PhoneFrame the alert opens in the device, also when the variant renders it next to the framed screen.
  const inherited = usePortalContainer();
  const frameMounted = usePhoneFrameMounted();
  const frame = usePhoneFrameDevice();
  // Wait one commit so a sibling PhoneFrame can register its device; otherwise the alert flashes at page level.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const container = inherited ?? frame;
  if (!ready || (!inherited && frameMounted && !frame)) return null;
  return (
    <PortalContainerProvider value={container}>
      <SystemAlertDialog {...props} />
    </PortalContainerProvider>
  );
}

function SystemAlertDialog({ platform = 'ios', title, message, actions }: SystemAlertProps) {
  const sideBySide = platform === 'ios' && actions.length === 2;

  return (
    // Always open, no Escape or outside click: a real system alert must be answered.
    <AlertDialog open>
      <AlertDialogContent
        size="sm"
        className={cn(
          'gap-0 overflow-hidden p-0',
          platform === 'ios' ? 'w-[270px] text-center' : 'w-[312px]',
          platform === 'web' && 'text-left',
        )}
      >
        <div className={cn('grid gap-1 px-4', platform === 'ios' ? 'pt-5 pb-4' : 'pt-6 pb-4')}>
          <AlertDialogTitle className="text-base font-medium">{title}</AlertDialogTitle>
          {message ? (
            <AlertDialogDescription className="text-sm text-foreground">{message}</AlertDialogDescription>
          ) : (
            <AlertDialogDescription className="sr-only">{platformLabel[platform]}</AlertDialogDescription>
          )}
        </div>

        {platform === 'ios' ? (
          <div className={cn('border-t border-border', sideBySide ? 'grid grid-cols-2 divide-x divide-border' : 'grid divide-y divide-border')}>
            {actions.map((action) => (
              <ScreenLink
                key={action.label}
                to={action.to}
                className={cn('block px-2 py-3 text-base text-primary hover:bg-muted', focusRing)}
              >
                {action.label}
              </ScreenLink>
            ))}
          </div>
        ) : (
          <div className={cn('gap-2 px-4 pb-4', platform === 'web' ? 'flex justify-end' : 'grid')}>
            {actions.map((action) => (
              <ScreenLink
                key={action.label}
                to={action.to}
                className={cn(
                  'block rounded-md border border-border px-3 py-2 text-center text-sm font-semibold text-primary hover:bg-muted',
                  focusRing,
                )}
              >
                {action.label}
              </ScreenLink>
            ))}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
