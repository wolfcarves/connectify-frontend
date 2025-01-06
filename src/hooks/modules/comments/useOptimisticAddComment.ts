import {
  CommentInfiniteData,
  GET_POST_COMMENTS_KEY,
} from '@/hooks/queries/useGetCommentsByPostId';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import { useQueryClient } from '@tanstack/react-query';
import { pages } from 'next/dist/build/templates/app-page';

export const useOptimisticAddComment = () => {
  const { data: user } = useGetCurrentSession();
  const queryClient = useQueryClient();

  const optimisticAddComment = ({
    postId,
    commentId,
    content,
  }: {
    postId: number;
    commentId: number;
    content: string;
  }) => {
    const getPostCommentsKey = [GET_POST_COMMENTS_KEY(), postId];

    queryClient.setQueryData(
      getPostCommentsKey,
      (previousState: CommentInfiniteData): CommentInfiniteData => {
        const prevPages = Array.from(previousState.pages);

        const newValue = {
          id: commentId,
          content: content,
          is_liked: false,
          likes_count: 0,
          replies_count: 0,
          user: user!,
          created_at: 'Just now',
          updated_at: 'Just now',
        };

        prevPages[0] = {
          ...prevPages[0],
          data: [newValue, ...prevPages[0].data],
        };

        return {
          ...previousState,
          pages: prevPages,
        };
      },
    );
  };

  return {
    optimisticAddComment,
  };
};
