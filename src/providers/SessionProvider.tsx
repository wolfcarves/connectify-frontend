'use client';

import UnauthorizedPage from '@/components/common/Unauthorized';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { ReactNode } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: session,
    isPending: isSessionLoading,
    isError: isSessionError,
  } = useGetCurrentSession();

  const isAuth = !!session?.id && !isSessionLoading && !isSessionError;

  if (!isAuth) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};

export default SessionProvider;
