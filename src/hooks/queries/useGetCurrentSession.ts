import getQueryClient from '@/lib/getQueryClient';
import { AuthenticationService } from '@/services';
import { OpenAPI } from '@/services/core/OpenAPI';
import { useQuery } from '@tanstack/react-query';

export const GET_CURRENT_SESSION_KEY = () => 'GET_CURRENT_SESSION';

export const prefetchCurrentSession = () => {
  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async () => {
      const response = await AuthenticationService.getCurrentSession();
      return response.data;
    },
  });
};

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async () => {
      const response = await AuthenticationService.getCurrentSession();
      return response.data;
    },
  });
}
