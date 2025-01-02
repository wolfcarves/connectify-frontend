'use client';

import { ReactNode } from 'react';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { usePathname, useRouter } from 'next/navigation';
import LoadingPage from '@/components/modules/Loading/LoadingPage';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useGetCurrentSession();

  const isAuthenticated = !!data?.id;

  if (isAuthenticated === undefined || isPending) {
    return <LoadingPage />;
  }

  if (!isAuthenticated && !pathname.startsWith('/login') && !isPending) {
    router.replace('/login');
    return;
  }

  return <>{children}</>;
};

export default AuthGuard;
