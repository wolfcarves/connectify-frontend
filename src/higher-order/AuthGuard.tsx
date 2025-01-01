'use client';

import { ReactNode, useEffect } from 'react';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { usePathname, useRouter } from 'next/navigation';
import LoadingPage from '@/components/modules/Loading/LoadingPage';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useGetCurrentSession();

  const isAuthenticated = data?.isAuth;

  useEffect(() => {
    if (!isAuthenticated && !pathname.startsWith('/login') && !isPending) {
      router.replace('/login');
      return;
    }
  }, [isAuthenticated, pathname, router, data, isPending]);

  if (isAuthenticated === undefined || isPending) return <LoadingPage />;

  return <>{children}</>;
};

export default AuthGuard;
