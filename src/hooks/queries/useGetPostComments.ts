import { CommentService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_POST_COMMENTS_KEY = () => 'GET_POST_COMMENTS_KEY';

export default function useGetPostComments(postId?: number) {
  return useQuery({
    queryKey: [GET_POST_COMMENTS_KEY(), postId],
    queryFn: async () => {
      const response = await CommentService.getPostComments(postId ?? -1);

      return response.data;
    },
    enabled: !!postId,
  });
}
