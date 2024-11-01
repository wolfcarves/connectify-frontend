import { FriendsService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useAcceptFriendRequest() {
  return useMutation({
    mutationKey: ['ACCEPT_FRIEND_REQUEST_KEY'],
    // userId to send request to
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.acceptFriendRequest(String(userId));
      return response;
    },
  });
}
