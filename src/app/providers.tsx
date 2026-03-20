'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { SplashScreenGate } from '@/shared/ui/SplashScreen';
import {
  handleGlobalReactQueryError,
  handleGlobalReactQueryMutationError,
} from '@/shared/lib/errors/globalReactQueryErrorHandler';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleGlobalReactQueryError,
        }),
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
          mutations: {
            retry: false,
            onError: handleGlobalReactQueryMutationError,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreenGate>{children}</SplashScreenGate>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom"
        buttonPosition="bottom-right"
      />
      <Toaster position={'top-right'} />
    </QueryClientProvider>
  );
}
