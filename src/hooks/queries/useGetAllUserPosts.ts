import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS_KEY = () => 'GET_ALL_USER_POSTS_KEY';

interface IQueryParams {
  page?: number;
  perPage?: number;
}

export default function useGetAllUserPosts(
  username: string,
  { page, perPage }: IQueryParams = { page: 1, perPage: 20 },
) {
  return useQuery({
    queryKey: [GET_ALL_USER_POSTS_KEY(), username, page, perPage],
    queryFn: async () => {
      const response = await PostService.getUserPosts({
        username,
        page,
        perPage,
      });

      return response.data;
    },
  });
}
