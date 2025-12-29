'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { hydrateAuth } from '@/store/slices/authSlice';
import { Toaster } from '@/components/ui/sonner';

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
      <AuthHydration>
        {children}
      </AuthHydration>
      <Toaster />
    </Provider>
  );
}
