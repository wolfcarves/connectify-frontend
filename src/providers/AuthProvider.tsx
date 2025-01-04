'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingPage from '@/components/modules/Loading/LoadingPage';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { useSocketStatusStore } from '@/store/useSocketStatusStore';
import socket from '@/lib/socket';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSocketConnected, setIsSocketConnected } = useSocketStatusStore();
  const { data: session } = useGetCurrentSession();

  const hasSession = !!session;

  useEffect(() => {
    if (!hasSession && !pathname.startsWith('/login')) {
      router.replace('/login');
      return;
    }

    if (hasSession && pathname.startsWith('/login')) {
      router.replace('/feed');
      return;
    }
  }, [hasSession, pathname, router]);

  // For Socket

  useEffect(() => {
    if (hasSession && !isSocketConnected)
      socket.on('connect', () => {
        setIsSocketConnected(true);
      });

    if (!hasSession && isSocketConnected)
      socket.on('disconnect', () => {
        setIsSocketConnected(false);
      });

    socket.connect();

    return () => {
      socket.off('connect');
    };
  }, [hasSession, isSocketConnected, setIsSocketConnected]);

  if (
    (!hasSession && !pathname.startsWith('/login')) ||
    (hasSession && pathname.startsWith('/login'))
  ) {
    return <LoadingPage />;
  }

  return children;
};

export default AuthProvider;
