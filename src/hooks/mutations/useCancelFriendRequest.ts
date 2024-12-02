import { FriendsService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_FRIEND_SUGGESTIONS_KEY } from '../queries/useGetFriendSuggestions';
import { GET_FRIEND_LIST_KEY } from '../queries/useGetFriendList';

export default function useCancelFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['CANCEL_FRIEND_REQUEST_KEY'],
    // userId to send request to
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.cancelFriendRequest(String(userId));

      return response.message;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_SUGGESTIONS_KEY()],
      });
      await queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_LIST_KEY()],
      });
    },
  });
}
