'use client';

import { useSessionStore } from '@/store/useSessionStore';
import { useSocketStatusStore } from '@/store/useSocketStatusStore';
import { ReactNode, useEffect } from 'react';

const SocketProvider = ({ children }: { children: ReactNode }) => {
  // const { session, fetchSession } = useSessionStore();
  // const hasSession = !!session;

  // const { isSocketConnected, connectSocket } = useSocketStatusStore();

  // useEffect(() => {
  //   fetchSession();

  //   if (hasSession && !isSocketConnected) {
  //     connectSocket();
  //   }
  // }, [connectSocket, fetchSession, hasSession, isSocketConnected]);

  // useEffect(() => {
  //   console.log('isSocketConnected', isSocketConnected);
  // }, [isSocketConnected]);

  return <>{children}</>;
};

export default SocketProvider;
