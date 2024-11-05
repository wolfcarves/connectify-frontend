import { FriendsService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_FRIEND_SUGGESTIONS_KEY } from '../queries/useGetFriendSuggestions';

export default function useUnfriendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['UNFRIEND_USER_KEY'],
    // userId to send request to
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.unfriendUser(String(userId));
      return response.message;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_SUGGESTIONS_KEY()],
      });
    },
    onError: err => console.log({ ...err }),
  });
}
