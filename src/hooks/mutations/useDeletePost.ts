import { PostService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';
import { GET_FEED_WORLD_POSTS_KEY } from '../queries/useGetFeedWorldPosts';

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['DELETE_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await PostService.deleteUserPost(postId!);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_ALL_USER_POSTS_KEY()],
      });
      await queryClient.invalidateQueries({
        queryKey: [GET_FEED_WORLD_POSTS_KEY()],
      });
    },
  });
}
