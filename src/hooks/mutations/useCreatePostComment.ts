import { CommentService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreatePostComment() {
  return useMutation({
    mutationKey: ['CREATE_POST_COMMENT_KEY'],
    mutationFn: async ({
      postId,
      comment,
    }: {
      postId?: number;
      comment: string;
    }) => {
      const response = await CommentService.postPostComment(postId ?? -1, {
        comment,
      });

      return response.message;
    },
    onSuccess: async () => {},
  });
}
