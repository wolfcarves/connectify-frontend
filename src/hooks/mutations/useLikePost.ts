import { LikeService, Post, User } from '@/services';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  GET_FEED_WORLD_POSTS_KEY,
  PostInfiniteData,
} from '../queries/useGetFeedDiscoverPosts';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';
import { GET_USER_POST_KEY } from '../queries/useGetUserPost';

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
      uuid,
    }: {
      postId: number;
      username: string;
      uuid: string;
    }) => {
      await updateOptimisticLike({ queryClient, postId, username, uuid });
    },
  });
}

export const updateOptimisticLike = async ({
  queryClient,
  postId,
  username,
  uuid,
}: {
  queryClient: QueryClient;
  postId: number;
  username?: String;
  uuid?: String;
}) => {
  const getFeedWorldPostsKey = [GET_FEED_WORLD_POSTS_KEY()];
  const isFeedWorldPostsExists = queryClient.getQueryData(getFeedWorldPostsKey);

  if (isFeedWorldPostsExists) {
    queryClient.setQueryData(
      getFeedWorldPostsKey,
      (oldPosts: PostInfiniteData) => {
        return {
          ...oldPosts,
          pages: oldPosts.pages.map(page => {
            return {
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
            };
          }),
        };
      },
    );
  }

  const getAllUserPostsKey = [GET_ALL_USER_POSTS_KEY(), username];
  const isAllUserPostDataExists = queryClient.getQueryData(getAllUserPostsKey);

  if (isAllUserPostDataExists) {
    queryClient.setQueryData(
      [GET_ALL_USER_POSTS_KEY(), username],
      (oldPosts: PostInfiniteData) => {
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

  const getUserPostKey = [GET_USER_POST_KEY(), uuid];
  const isGetUserPostExists = queryClient.getQueryData(getUserPostKey);

  if (isGetUserPostExists) {
    queryClient.setQueryData(
      getUserPostKey,
      (oldPost: { post: Post; user: User }): { post: Post; user: User } => {
        return {
          post: {
            ...oldPost.post,
            is_liked: !oldPost.post.is_liked,
            likes_count: oldPost.post.is_liked
              ? oldPost.post.likes_count - 1
              : oldPost.post.likes_count + 1,
          },
          user: oldPost.user,
        };
      },
    );
  }
};
