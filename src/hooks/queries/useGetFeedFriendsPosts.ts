import { FeedService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_FEED_FRIENDS_POSTS_KEY = () => 'GET_FEED_FRIENDS_POSTS_KEY';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetFeedFriendsPosts(
  { page, per_page }: IQueryParams = { page: 1, per_page: 20 },
) {
  return useQuery({
    queryKey: [GET_FEED_FRIENDS_POSTS_KEY(), page, per_page],
    queryFn: async () => {
      const response = await FeedService.getFeedFriendsPosts(page, per_page);
      return response.data;
    },
  });
}
