import { FriendsService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_FRIEND_SUGGESTIONS_KEY } from '../queries/useGetFriendSuggestions';
import { GET_FRIEND_LIST_KEY } from '../queries/useGetFriendList';

export default function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['SEND_FRIEND_REQUEST_KEY'],
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.sendFriendRequest(String(userId));

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
