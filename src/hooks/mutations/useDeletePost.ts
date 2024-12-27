import { PostService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_FEED_WORLD_POSTS_KEY,
  FeedPostData,
} from '../queries/useGetFeedDiscoverPosts';

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['DELETE_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await PostService.deleteUserPost({ postId });

      return response;
    },
    onMutate: async (postId: number) => {
      queryClient.setQueryData(
        [GET_FEED_WORLD_POSTS_KEY()],
        (oldPosts: FeedPostData) => {
          return {
            ...oldPosts,
            pages: oldPosts.pages.map(page => ({
              ...page,
              data: page.data.filter(p => p.post.id !== postId),
            })),
          };
        },
      );
    },
  });
}
