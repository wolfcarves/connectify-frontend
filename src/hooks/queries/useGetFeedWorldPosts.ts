import { FeedService } from '@/services';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GET_FEED_WORLD_POSTS_KEY = () => 'GET_FEED_WORLD_POSTS_KEY';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetFeedWorldPosts(
  { page, per_page }: IQueryParams = { page: 1, per_page: 10 },
) {
  return useInfiniteQuery({
    queryKey: [GET_FEED_WORLD_POSTS_KEY(), page, per_page],
    queryFn: async () => {
      const response = await FeedService.getFeedWorldPosts({ page, per_page });
      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
}
