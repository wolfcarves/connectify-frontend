import { PostService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useUnSaveUserPost() {
  return useMutation({
    mutationKey: ['UNSAVE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      return await PostService.unSaveUserPost(postId);
    },
  });
}
