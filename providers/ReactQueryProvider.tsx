'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          retry: 0,
        },
        queries: {
          retry: 0,
        },
      },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
