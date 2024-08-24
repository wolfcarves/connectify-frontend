import { EngagementService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_POST_COMMENTS_KEY } from '../queries/useGetPostComments';

export default function useCreatePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['CREATE_POST_COMMENT_KEY'],
    mutationFn: async ({
      postId,
      comment,
    }: {
      postId?: number;
      comment: string;
    }) => {
      const response = await EngagementService.postPostComment(postId ?? -1, {
        comment,
      });

      return response.message;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_POST_COMMENTS_KEY()],
      });
    },
  });
}
