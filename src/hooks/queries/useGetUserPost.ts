import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_USER_POST_KEY = () => 'GET_USER_POST_KEY';

export default function useGetUserPost(uuid: string) {
  return useQuery({
    queryKey: [GET_USER_POST_KEY(), uuid],
    queryFn: async () => {
      const response = await PostService.getUserPost({ uuid });

      return response?.data;
    },
    staleTime: 0,
  });
}
