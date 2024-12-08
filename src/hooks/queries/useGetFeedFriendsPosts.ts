import { FeedService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_FEED_FRIENDS_POSTS_KEY = () => 'GET_FEED_FRIENDS_POSTS_KEY';

interface IQueryParams {
  page?: number;
  perPage?: number;
}

export default function useGetFeedFriendsPosts(
  { page, perPage }: IQueryParams = { page: 1, perPage: 20 },
) {
  return useQuery({
    queryKey: [GET_FEED_FRIENDS_POSTS_KEY(), page, perPage],
    queryFn: async () => {
      const response = await FeedService.getFeedFriendsPosts({
        page,
        perPage,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 30,
  });
}
