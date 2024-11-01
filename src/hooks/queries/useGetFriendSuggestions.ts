import { FriendsService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useSession from '../useSession';

export const GET_FRIEND_SUGGESTIONS_KEY = () => 'GET_FRIEND_SUGGESTIONS_KEY';

export default function useGetFriendSuggestions() {
  return useQuery({
    queryKey: ['GET_FRIEND_SUGGESTIONS_KEY'],
    queryFn: async () => {
      const response = await FriendsService.getFriendSuggestions();

      return response.data;
    },
  });
}
