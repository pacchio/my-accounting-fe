'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { hydrateAuth } from '@/store/slices/authSlice';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

function AuthHydration({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate auth state from localStorage on mount (client-side only)
    store.dispatch(hydrateAuth());
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider delayDuration={200} skipDelayDuration={300}>
        <AuthHydration>
          {children}
        </AuthHydration>
      </TooltipProvider>
      <Toaster />
    </Provider>
  );
}
