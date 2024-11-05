import { FriendsService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_FRIEND_LIST_KEY = () => 'GET_FRIEND_LIST_KEY';

export default function useGetFriendList(userId?: number) {
  return useQuery({
    queryKey: [GET_FRIEND_LIST_KEY(), userId],
    queryFn: async () => {
      const response = await FriendsService.getFriendList(userId!);
      return response.data;
    },
    enabled: !!userId,
  });
}
