import { create } from 'zustand';

type SocketState = {
  isSocketConnected: boolean;
  setIsSocketConnected: (status: boolean) => void;
};

export const useSocketStatusStore = create<SocketState>(set => ({
  isSocketConnected: false,
  setIsSocketConnected: (status: boolean) => set({ isSocketConnected: status }),
}));
