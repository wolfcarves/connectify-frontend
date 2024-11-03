import { FriendsService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_FRIEND_LIST_KEY } from '../queries/useGetFriendList';
import { GET_USER_PROFILE_KEY } from '../queries/useGetUserProfile';

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
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_KEY()],
      });
    },
  });
}
