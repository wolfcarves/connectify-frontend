import { EngagementService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USER_POSTS } from '../queries/useGetAllUserPosts';

export default function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LIKE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await EngagementService.postLikePost(postId);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_POSTS()] });
    },
  });
}
