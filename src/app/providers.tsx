'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { SplashScreenGate } from '@/shared/ui/SplashScreen';
import {
  shouldSkipGlobalErrorHandler,
  showApiErrorToast,
} from '@/shared/lib/errors/globalReactQueryErrorHandler';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (shouldSkipGlobalErrorHandler(query.meta)) return;
            showApiErrorToast(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (shouldSkipGlobalErrorHandler(mutation.options.meta)) return;
            showApiErrorToast(error);
          },
        }),
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
          mutations: {
            retry: false,
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
