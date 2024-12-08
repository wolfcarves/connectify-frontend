import { CommentService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreateReply() {
  return useMutation({
    mutationKey: ['CREATE_REPLY_KEY'],
    mutationFn: async ({
      postId,
      commentId,
      content,
    }: {
      postId?: number;
      commentId?: number;
      content: string;
    }) => {
      const response = await CommentService.postPostComment({
        postId,
        commentId,
        requestBody: {
          content,
        },
      });

      return response;
    },
    onSuccess: async () => {},
  });
}
