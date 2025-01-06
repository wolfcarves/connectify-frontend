import { CommentService } from '@/services';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { GET_POST_COMMENTS_KEY } from '../queries/useGetCommentsByPostId';

export default function useCreateComment() {
  return useMutation({
    mutationKey: ['CREATE_POST_COMMENT_KEY'],
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number;
      content: string;
    }) => {
      const response = await CommentService.postPostComment({
        postId: postId ?? -1,
        requestBody: {
          content,
        },
      });

      return response.data;
    },
  });
}

const addOptimisticComment = ({
  queryClient,
  postId,
  content,
}: {
  queryClient: QueryClient;
  postId: number;
  content: string;
}) => {
  const getPostCommentsKey = [GET_POST_COMMENTS_KEY(), postId];

  queryClient.setQueryData(getPostCommentsKey, (oldData: any) => {
    const newData = oldData ?? {
      pages: [
        {
          data: [
            {
              id: 1,
              content,
              user: {
                id: 101,
                avatar: '/m_avatar_1.svg',
                name: 'John Doe',
                username: 'johndoe',
              },
              is_liked: true,
              likes_count: 0,
              replies_count: 0,
              created_at: 'Just now',
              updated_at: new Date().toISOString(),
            },
          ],
          pagination: {
            total: 0,
            page: 1,
            limit: 10,
          },
        },
      ],
      pageParams: [],
    };

    return newData;
  });
};
