import { PostService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS_KEY = () => 'GET_ALL_USER_POSTS_KEY';

export default function useGetAllUserPosts(username: string) {
  return useInfiniteQuery({
    queryKey: [GET_ALL_USER_POSTS_KEY(), username],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await PostService.getUserPosts({
        username,
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
