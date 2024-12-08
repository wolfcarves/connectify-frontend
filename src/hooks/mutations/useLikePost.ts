import { LikeService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useLikePost() {
  return useMutation({
    mutationKey: ['LIKE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await LikeService.postLikePost({ postId });
      return response;
    },
  });
}
