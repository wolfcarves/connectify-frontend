import { FriendsService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCancelFriendRequest() {
  return useMutation({
    mutationKey: ['CANCEL_FRIEND_REQUEST_KEY'],
    // userId to send request to
    mutationFn: async (userId?: number) => {
      const response = await FriendsService.cancelFriendRequest(String(userId));

      return response.message;
    },
  });
}
