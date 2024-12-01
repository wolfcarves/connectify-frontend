import { Audience, PostService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useChangePostAudience() {
  return useMutation({
    mutationKey: ['CHANGE_POST_AUDIENCE_KEY'],
    mutationFn: async ({
      postId,
      audience,
    }: {
      postId: number;
      audience: Audience;
    }) => {
      const response = await PostService.putChangeAudience(postId, {
        audience,
      });

      return response;
    },
  });
}
