import { CommentService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreateComment() {
  return useMutation({
    mutationKey: ['CREATE_POST_COMMENT_KEY'],
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number;
      content: string;
    }) => {
      const response = await CommentService.postPostComment({
        postId: postId ?? -1,
        requestBody: {
          content,
        },
      });

      return response.data;
    },
  });
}
