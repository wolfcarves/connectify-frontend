import { FriendsService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_FRIEND_LIST_KEY } from '../queries/useGetFriendList';

export default function useAcceptFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['ACCEPT_FRIEND_REQUEST_KEY'],
    // userId to send request to
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.acceptFriendRequest(String(userId));
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_LIST_KEY()],
      });
    },
  });
}
