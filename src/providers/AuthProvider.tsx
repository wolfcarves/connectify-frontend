'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingPage from '@/components/modules/Loading/LoadingPage';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { useSocketStatusStore } from '@/store/useSocketStatusStore';
import socket from '@/lib/socket';

const authRoutes = ['/login', '/signup'];

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useGetCurrentSession();

  const hasSession = !!session;

  useEffect(() => {
    if (!hasSession && !authRoutes.includes(pathname)) {
      router.replace('/login');
      return;
    }

    if (hasSession && authRoutes.includes(pathname)) {
      router.replace('/feed');
      return;
    }
  }, [hasSession, pathname, router]);

  if (
    (!hasSession && !authRoutes.includes(pathname)) ||
    (hasSession && authRoutes.includes(pathname))
  ) {
    return <LoadingPage />;
  }

  return <SocketProvider hasSession={hasSession}>{children}</SocketProvider>;
};

const SocketProvider = ({
  children,
  hasSession,
}: {
  children: ReactNode;
  hasSession: boolean;
}) => {
  const { isSocketConnected, setIsSocketConnected } = useSocketStatusStore();

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

  return <>{children}</>;
};

export default AuthProvider;
