import socket from '@/lib/socket';
import { create } from 'zustand';

type SocketState = {
  isSocketConnected: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const useSocketStore = create<SocketState>(set => {
  const connectSocket = () => {
    socket.connect();
    socket.on('connect', () => set({ isSocketConnected: true }));
  };

  const disconnectSocket = () => {
    socket.disconnect();
    socket.on('disconnect', () => set({ isSocketConnected: false }));
  };

  return {
    isSocketConnected: false,
    connectSocket,
    disconnectSocket,
  };
});
