import getQueryClient from '@/lib/getQueryClient';
import { AuthenticationService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_CURRENT_SESSION_KEY = () => 'GET_CURRENT_SESSION';

const getCurrentSession = async () => {
  const response = await AuthenticationService.getCurrentSession();
  return response.data;
};

export const usePrefetchGetCurrentSession = () => {
  const queryClient = getQueryClient();

  return queryClient.prefetchQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: getCurrentSession,
  });
};

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: getCurrentSession,
  });
}
