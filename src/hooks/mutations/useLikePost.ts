import { LikeService, Pagination, Post, User } from '@/services';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GET_FEED_WORLD_POSTS_KEY } from '../queries/useGetFeedWorldPosts';

type InfinitePostData = InfiniteData<
  {
    data: Array<{
      post: Post;
      user: User;
    }>;
    pagination: Pagination;
  },
  unknown
>;

export default function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LIKE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      const response = await LikeService.postLikePost({ postId });
      return response;
    },
    onMutate: async postId => {
      queryClient.setQueryData(
        [GET_FEED_WORLD_POSTS_KEY()],
        (oldPosts: InfinitePostData) => {
          return {
            ...oldPosts,
            pages: oldPosts.pages.map(page => ({
              ...page,
              data: page.data.map(post => {
                return post.post.id === postId
                  ? {
                      ...post,
                      post: { ...post.post, is_liked: !post.post.is_liked },
                    }
                  : post;
              }),
            })),
          };
        },
      );
    },
  });
}
