import { FeedService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_FEED_WORLD_POSTS_KEY = () => 'GET_FEED_WORLD_POSTS_KEY';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetFeedWorldPosts(
  { page, per_page }: IQueryParams = { page: 1, per_page: 20 },
) {
  return useQuery({
    queryKey: [GET_FEED_WORLD_POSTS_KEY(), page, per_page],
    queryFn: async () => {
      const response = await FeedService.getFeedWorldPosts(page, per_page);
      return response.data;
    },
    staleTime: 0,
  });
}
