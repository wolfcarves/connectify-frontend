import { EngagementService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';
import { GET_ALL_USER_POST_KEY } from '../queries/useGetUserPost';
import { usePathname } from 'next/navigation';

export default function useLikePost() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LIKE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await EngagementService.postLikePost(postId);
      return response;
    },
    onSuccess: async () => {
      //To invalidate only one route
      if (pathname.startsWith('/post')) {
        await queryClient.invalidateQueries({
          queryKey: [GET_ALL_USER_POST_KEY()],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: [GET_ALL_USER_POSTS_KEY()],
        });
      }
    },
  });
}
