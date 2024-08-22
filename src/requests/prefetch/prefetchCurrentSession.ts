import { AuthenticationService } from '@/services';
import { OpenAPI } from '@/services/core/OpenAPI';
import { cookies } from 'next/headers';
import { GET_CURRENT_SESSION_KEY } from '@/hooks/queries/useGetCurrentSession';
import getQueryClient from '@/lib/getQueryClient';

export default async function prefetchCurrentSession() {
  const queryClient = getQueryClient();
  const authCookie = cookies().get('auth_session');

  return await queryClient.prefetchQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async () => {
      OpenAPI.HEADERS = {
        cookie: `${authCookie?.name}=${authCookie?.value}`,
      };

      const response = await AuthenticationService.getCurrentSession();

      return response.data;
    },
  });
}
