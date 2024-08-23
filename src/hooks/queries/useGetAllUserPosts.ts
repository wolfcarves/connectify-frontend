import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS = () => 'GET_ALL_USER_POSTS';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetAllUserPosts(
  username: string,
  { page, per_page }: IQueryParams = { page: 1, per_page: 10 },
) {
  return useQuery({
    queryKey: [GET_ALL_USER_POSTS()],
    queryFn: async () => {
      const response = await PostService.getUserPosts(username, page, per_page);

      new Promise(res => setTimeout(() => res('goods'), 5000));

      return response.data;
    },
  });
}
