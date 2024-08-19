import { PostService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_ALL_USER_POSTS = () => 'GET_ALL_USER_POSTS';

export const getAllUserPostsQuery = (userId: number) => {
  return {
    queryKey: [GET_ALL_USER_POSTS()],
    queryFn: async () => {
      const response = await PostService.getUserPosts(userId);

      return response.data;
    },
  };
};

export default function useGetAllUserPosts(userId: number) {
  return useQuery(getAllUserPostsQuery(userId));
}
