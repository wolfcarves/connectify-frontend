import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export default function useGetUsers(search?: string) {
  return useQuery({
    queryKey: ['GET_USERS_KEY', search],
    queryFn: async () => {
      const response = await UserService.getUsers({ search });
      return response;
    },
    enabled: !!search,
    staleTime: 0,
  });
}
