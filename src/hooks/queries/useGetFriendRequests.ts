import { FriendsService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_FRIEND_REQUESTS_KEY = () => 'GET_FRIEND_REQUESTS_KEY';

export default function useGetFriendRequests() {
  return useQuery({
    queryKey: ['GET_FRIEND_REQUESTS_KEY'],
    queryFn: async () => {
      const response = await FriendsService.getFriendRequests();
      return response.data;
    },
    refetchOnMount: true,
    staleTime: 0,
  });
}
