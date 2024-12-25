import { FeedService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GET_FEED_WORLD_POSTS_KEY = () => 'GET_FEED_WORLD_POSTS_KEY';

interface IQueryParams {
  page?: number;
  perPage?: number;
}

export default function useGetFeedWorldPosts(
  { page, perPage }: IQueryParams = { page: 1, perPage: 10 },
) {
  return useInfiniteQuery({
    queryKey: [GET_FEED_WORLD_POSTS_KEY()],
    queryFn: async () => {
      const response = await FeedService.getFeedWorldPosts({ page, perPage });
      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}
