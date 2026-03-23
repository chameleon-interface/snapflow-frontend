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
import { useTranslations } from 'next-intl';
import {
  createReactQueryApiErrorHandler,
  type ReactQueryApiErrorToastMessages,
  type ReactQueryApiErrorSkipMeta,
} from '@/shared/lib/errors/reactQueryApiErrorHandler';

export default function Providers({ children }: { children: React.ReactNode }) {
  const tCommon = useTranslations('Common');
  const messages: ReactQueryApiErrorToastMessages = {
    genericError: tCommon('somethingWentWrong'),
    networkError: tCommon('networkError'),
  };
  const handleReactQueryApiError = createReactQueryApiErrorHandler(messages);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            handleReactQueryApiError(
              error,
              query.meta as ReactQueryApiErrorSkipMeta | undefined,
            );
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            handleReactQueryApiError(
              error,
              mutation.options.meta as ReactQueryApiErrorSkipMeta | undefined,
            );
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
