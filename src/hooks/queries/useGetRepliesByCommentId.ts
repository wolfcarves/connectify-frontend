import { ReplyService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetRepliesByCommentId(
  commentId: number,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ['GET_REPLIES_BY_COMMENT_ID', commentId],
    queryFn: async () => {
      const response = await ReplyService.getCommentReplies(commentId!);

      return response;
    },
    enabled: !!commentId && enabled,
  });
}
