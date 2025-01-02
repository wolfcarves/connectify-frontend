'use client';

import LoadingPage from '@/components/modules/Loading/LoadingPage';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useGetCurrentSession();

  const isAuthenticated = data?.isAuth;

  if (pathname.startsWith('/login') && isAuthenticated) {
    router.replace('/feed');
    return;
  }

  if (isAuthenticated === undefined || isPending) return <LoadingPage />;

  return <>{children}</>;
};

export default SessionProvider;
