import { PostService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useSaveUserPost() {
  return useMutation({
    mutationKey: ['SAVE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      return await PostService.saveUserPost(postId);
    },
  });
}
