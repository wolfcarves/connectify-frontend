'use client';

import LoadingPage from '@/components/modules/Loading/LoadingPage';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useGetCurrentSession();

  const isAuthenticated = data?.isAuth;

  useEffect(() => {
    if (pathname.startsWith('/login') && isAuthenticated) {
      router.replace('/feed');
      return;
    }
  }, [isAuthenticated, pathname, router, data]);

  if (isAuthenticated === undefined || isPending) return <LoadingPage />;

  return <>{children}</>;
};

export default SessionProvider;
