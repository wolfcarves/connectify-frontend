import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthenticationService } from '@/services';
import { ApiError } from '@/services/core/ApiError';

type SessionState = {
  session: any | null;
  isLoading: boolean;
  hasFetched: boolean;
  error: string | null;
  fetchSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>()(
  devtools(set => ({
    session: null,
    isLoading: false,
    hasFetched: false,
    error: null,
    fetchSession: async () => {
      set(state =>
        state.isLoading ? state : { isLoading: true, error: null },
      );
      try {
        const { data } = await AuthenticationService.getCurrentSession();
        set({
          session: data,
          isLoading: false,
          hasFetched: true,
        });
      } catch (error) {
        set({
          session: null,
          error: error instanceof ApiError ? error.message : 'Unknown error',
          isLoading: false,
          hasFetched: true,
        });
      }
    },
  })),
);
