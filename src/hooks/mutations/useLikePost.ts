import { LikeService } from '@/services';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  GET_FEED_WORLD_POSTS_KEY,
  FeedPostData,
} from '../queries/useGetFeedDiscoverPosts';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';

export default function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LIKE_USER_POST_KEY'],
    mutationFn: async ({ postId }: { postId: number }) => {
      const response = await LikeService.postLikePost({ postId });
      return response;
    },
    onMutate: async ({
      postId,
      username,
    }: {
      postId: number;
      username: string;
    }) => {
      await updateOptimisticLike({ queryClient, postId, username });
    },
  });
}

export const updateOptimisticLike = async ({
  queryClient,
  postId,
  username,
}: {
  queryClient: QueryClient;
  postId: number;
  username?: String;
}) => {
  const getFeedWorldPostsKey = [GET_FEED_WORLD_POSTS_KEY()];
  const isFeedWorldPostsExists = queryClient.getQueryData(getFeedWorldPostsKey);

  if (isFeedWorldPostsExists) {
    queryClient.setQueryData(
      [GET_FEED_WORLD_POSTS_KEY()],
      (oldPosts: FeedPostData) => {
        return {
          ...oldPosts,
          pages: oldPosts.pages.map(page => ({
            ...page,
            data: page.data.map(post => {
              return post.post.id === postId
                ? {
                    ...post,
                    post: {
                      ...post.post,
                      is_liked: !post.post.is_liked,
                      likes_count: post.post.is_liked
                        ? post.post.likes_count - 1
                        : post.post.likes_count + 1,
                    },
                  }
                : post;
            }),
          })),
        };
      },
    );
  }

  const getAllUserPostsKey = [GET_ALL_USER_POSTS_KEY(), username];
  const isAllUserPostDataExists = queryClient.getQueryData(getAllUserPostsKey);

  if (isAllUserPostDataExists) {
    queryClient.setQueryData(
      [GET_ALL_USER_POSTS_KEY(), username],
      (oldPosts: FeedPostData) => {
        return {
          ...oldPosts,
          pages: oldPosts.pages.map(page => ({
            ...page,
            data: page.data.map(post => {
              return post.post.id === postId
                ? {
                    ...post,
                    post: {
                      ...post.post,
                      is_liked: !post.post.is_liked,
                    },
                  }
                : post;
            }),
          })),
        };
      },
    );
  }
};
