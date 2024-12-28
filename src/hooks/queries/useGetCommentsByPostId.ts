import { Comment, CommentService, Pagination, User } from '@/services';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const GET_POST_COMMENTS_KEY = () => 'GET_POST_COMMENTS_KEY';

export type CommentInfiniteData = InfiniteData<
  {
    data: Array<Comment>;
    pagination: Pagination;
  },
  unknown
>;

export default function useGetCommentsByPostId(postId: number) {
  return useInfiniteQuery({
    queryKey: [GET_POST_COMMENTS_KEY(), postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await CommentService.getPostComments({
        postId: postId,
        page: pageParam,
      });

      return response;
    },
    enabled: !!postId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
    staleTime: 0,
  });
}
