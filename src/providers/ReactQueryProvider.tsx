'use client';

import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

let browserQueryClient: QueryClient | undefined = undefined;

const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 0,
      },
      queries: {
        retry: 0,
        staleTime: 60 * 1000,
      },
    },
  });
};

const getQueryClient = () => {
  if (isServer) {
    return createQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = createQueryClient();

    return browserQueryClient;
  }
};

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
