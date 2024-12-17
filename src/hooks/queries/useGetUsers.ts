import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetUsers(search: string) {
  return useQuery({
    queryKey: ['GET_USERS_KEY'],
    queryFn: async () => {
      const response = await UserService.getUsers({ search });
      return response;
    },
  });
}
