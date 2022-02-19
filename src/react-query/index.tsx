import React from 'react';
import { useToast } from 'native-base';

import { QueryClientProvider, QueryClient } from 'react-query';

export function queryErrorHandler(error: unknown): void {
  const toast = useToast();
  const description =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
        error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast.show({
    title: 'Something went wrong',
    status: 'error',
    description,
  });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
      refetchOnWindowFocus: false,
    },
  },
});

const QueryProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
