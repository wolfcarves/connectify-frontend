import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS_KEY = () => 'GET_ALL_USER_POSTS_KEY';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetAllUserPosts(
  username: string,
  { page, per_page }: IQueryParams = { page: 1, per_page: 20 },
) {
  return useQuery({
    queryKey: [GET_ALL_USER_POSTS_KEY()],
    queryFn: async () => {
      const response = await PostService.getUserPosts(username, page, per_page);

      new Promise(res => setTimeout(() => res('goods'), 5000));

      return response.data;
    },
  });
}
