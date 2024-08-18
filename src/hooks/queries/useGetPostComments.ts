import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetPostComments(postId: number) {
  return useQuery({
    queryKey: ['GET_POST_COMMENTS', postId],
    queryFn: async () => {
      const response = await PostService.getPostComments(postId);

      return response.data;
    },
  });
}
