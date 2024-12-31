import { CommentService } from '@/services';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GET_POST_COMMENTS_KEY } from '../queries/useGetCommentsByPostId';

export default function useCreateComment() {
  const queryClient = useQueryClient();

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
    onMutate: ({ postId }) => {
      addOptimisticComment({ queryClient, postId });
    },
    onSuccess: data => console.log('success', data),
  });
}

const addOptimisticComment = ({
  queryClient,
  postId,
}: {
  queryClient: QueryClient;
  postId: number;
}) => {
  const getPostCommentsKey = [GET_POST_COMMENTS_KEY(), postId];

  queryClient.setQueryData(getPostCommentsKey, (oldData: any) => {
    const newData = oldData ?? {
      pages: [
        {
          data: [
            {
              id: 1,
              content: 'This is a sample comment.',
              user: {
                id: 101,
                avatar: '/m_avatar_1.svg',
                name: 'John Doe',
                username: 'johndoe',
              },
              is_liked: true,
              likes_count: 15,
              replies_count: 2,
              created_at: '2024-12-28T12:34:56Z',
              updated_at: '2024-12-28T13:00:00Z',
            },
          ], // Initialize comments data
          pagination: {
            total: 0, // Total comments
            page: 1, // Current page
            limit: 10, // Default limit
          },
        },
      ],
      pageParams: [],
    };

    return newData;
  });
};
