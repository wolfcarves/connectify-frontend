'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import LoadingPage from '@/components/modules/Loading/LoadingPage';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useGetCurrentSession();

  const hasSession = !!session;

  useEffect(() => {
    if (!hasSession && !pathname.startsWith('/login')) {
      router.replace('/login');
    }

    if (hasSession && pathname.startsWith('/login')) {
      router.replace('/feed');
    }
  }, [hasSession, pathname, router]);

  if (
    (!hasSession && !pathname.startsWith('/login')) ||
    (hasSession && pathname.startsWith('/login'))
  ) {
    return <LoadingPage />;
  }

  return children;
};

export default AuthProvider;
