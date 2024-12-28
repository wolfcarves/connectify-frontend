import { LikeService, Comment, Pagination } from '@/services';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CommentInfiniteData,
  GET_POST_COMMENTS_KEY,
} from '../queries/useGetCommentsByPostId';

export default function useLikeComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LIKE_USER_COMMENT_KEY'],
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: number;
      commentId: number;
    }) => {
      const response = await LikeService.postLikeComment({ commentId });
      return response;
    },
    onMutate: ({ postId, commentId }) => {
      updateOptimisticLike({ queryClient, commentId, postId });
    },
  });
}

export const updateOptimisticLike = async ({
  queryClient,
  postId,
  commentId,
}: {
  queryClient: QueryClient;
  postId: number;
  commentId: number;
}) => {
  const getPostCommentsKey = [GET_POST_COMMENTS_KEY(), postId];
  const isGetPostCommentsExists = queryClient.getQueryData(getPostCommentsKey);

  if (isGetPostCommentsExists) {
    queryClient.setQueryData(
      getPostCommentsKey,
      ({ pages, pageParams }: CommentInfiniteData): CommentInfiniteData => {
        return {
          pages: pages.map(({ data, pagination }) => {
            return {
              data: data.map(comment => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    is_liked: !comment.is_liked,
                    likes_count: comment.is_liked
                      ? comment.likes_count - 1
                      : comment.likes_count + 1,
                  };
                }

                return comment;
              }),
              pagination,
            };
          }),
          pageParams,
        };
      },
    );
  }
};
