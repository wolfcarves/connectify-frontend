'use client';

import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { useSessionStore } from '@/store/useSessionStore';
import { useSocketStore } from '@/store/useSocketStore';
import { ReactNode, useEffect } from 'react';

const SocketProvider = ({ children }: { children: ReactNode }) => {
  // const { isSocketConnected, connectSocket, disconnectSocket } =
  //   useSocketStore();

  return <>{children}</>;
};

export default SocketProvider;
