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
    queryKey: [GET_ALL_USER_POSTS_KEY(), username, page, per_page],
    queryFn: async () => {
      const response = await PostService.getUserPosts({
        username,
        page,
        per_page,
      });

      return response.data;
    },
  });
}
