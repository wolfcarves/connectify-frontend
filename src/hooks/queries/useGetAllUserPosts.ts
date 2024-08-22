import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS = () => 'GET_ALL_USER_POSTS';

export default function useGetAllUserPosts(userId: number) {
  return useQuery({
    queryKey: [GET_ALL_USER_POSTS()],
    queryFn: async () => {
      const response = await PostService.getUserPosts(userId);

      return response.data;
    },
  });
}
