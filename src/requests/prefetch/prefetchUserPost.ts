import { PostService } from '@/services';
import { OpenAPI } from '@/services/core/OpenAPI';
import { cookies } from 'next/headers';
import getQueryClient from '@/lib/getQueryClient';
import { GET_USER_POST_KEY } from '@/hooks/queries/useGetUserPost';

export default async function prefetchUserPost(uuid: string) {
  const queryClient = getQueryClient();
  const authCookie = (await cookies()).get('auth_session');

  return await queryClient.prefetchQuery({
    queryKey: [GET_USER_POST_KEY()],
    queryFn: async () => {
      OpenAPI.HEADERS = {
        cookie: `${authCookie?.name}=${authCookie?.value}`,
      };

      const response = await PostService.getUserPost({ uuid });

      return response.data;
    },
  });
}
