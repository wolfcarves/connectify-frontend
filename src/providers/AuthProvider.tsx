'use client';

import { ReactNode, useEffect } from 'react';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { usePathname, useRouter } from 'next/navigation';
import LoadingPage from '@/components/modules/Loading/LoadingPage';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useGetCurrentSession();

  const isAuthenticated = !!data?.id;

  useEffect(() => {
    if (!isPending) {
      if (isAuthenticated && pathname.startsWith('/login')) {
        router.replace('/');
        return;
      }

      if (!isAuthenticated && !pathname.startsWith('/login')) {
        router.replace('/login');
        return;
      }
    }
  }, [isAuthenticated, isPending, pathname, router]);

  if (isAuthenticated === undefined || isPending) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default AuthProvider;
