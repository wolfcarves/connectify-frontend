import { PostService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useDeletePost() {
  return useMutation({
    mutationKey: ['DELETE_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await PostService.deleteUserPost({ postId });

      return response;
    },
  });
}
