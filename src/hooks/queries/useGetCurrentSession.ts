import { AuthenticationService, User } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_CURRENT_SESSION_KEY = () => 'GET_CURRENT_SESSION_KEY';

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async (): Promise<User> => {
      const response = await AuthenticationService.getCurrentSession();
      return response.data;
    },
  });
}
