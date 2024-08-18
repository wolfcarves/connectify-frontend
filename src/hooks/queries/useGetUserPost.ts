import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetUserPost(postId: number) {
  return useQuery({
    queryKey: ['GET_USER_POST', postId],
    queryFn: async () => {
      const response = await PostService.getUserPost(postId);

      return response.data;
    },
  });
}
