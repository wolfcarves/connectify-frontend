import { LikeService } from '@/services';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  GET_FEED_WORLD_POSTS_KEY,
  FeedPostData,
} from '../queries/useGetFeedWorldPosts';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';
import { usePathname } from 'next/navigation';

export default function useLikePost() {
  const pathname = usePathname();
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
      await updateOptimisticLike({ queryClient, postId, username, pathname });
    },
  });
}

export const updateOptimisticLike = async ({
  queryClient,
  postId,
  username,
  pathname,
}: {
  queryClient: QueryClient;
  postId: number;
  username?: String;
  pathname?: String;
}) => {
  if (pathname !== `/${username}`) {
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
                    post: { ...post.post, is_liked: !post.post.is_liked },
                  }
                : post;
            }),
          })),
        };
      },
    );
  }

  if (pathname === `/${username}`) {
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
                    post: { ...post.post, is_liked: !post.post.is_liked },
                  }
                : post;
            }),
          })),
        };
      },
    );
  }
};
