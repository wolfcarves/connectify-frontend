import { AuthenticationService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: ['GET_CURRENT_SESSION'],
    queryFn: async () => {
      const response = await AuthenticationService.getCurrentSession();

      return response.data;
    },
  });
}
