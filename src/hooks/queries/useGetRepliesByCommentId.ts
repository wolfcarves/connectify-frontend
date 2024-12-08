import { CommentService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetRepliesByCommentId({
  postId,
  commentId,
  enabled,
}: {
  postId?: number;
  commentId?: number;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ['GET_REPLIES_BY_COMMENT_ID', commentId],
    queryFn: async () => {
      const response = await CommentService.getPostComments({
        postId,
        commentId,
      });

      return response;
    },
    enabled: !!commentId && enabled,
  });
}
