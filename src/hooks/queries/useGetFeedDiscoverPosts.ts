import { FeedService, Pagination, Post, User } from '@/services';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const GET_FEED_WORLD_POSTS_KEY = () => 'GET_FEED_WORLD_POSTS_KEY';

export type PostInfiniteData = InfiniteData<
  {
    data: Array<{
      post: Post;
      user: User;
    }>;
    pagination: Pagination;
  },
  unknown
>;

export default function useGetFeedDiscoverPosts() {
  return useInfiniteQuery({
    queryKey: [GET_FEED_WORLD_POSTS_KEY()],
    queryFn: async ({ pageParam }) => {
      const response = await FeedService.getFeedDiscoverPosts({
        page: pageParam,
      });
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
