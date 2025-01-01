import { env } from '@/config/env';
import { AuthenticationService, Session } from '@/services';
import { ApiError } from '@/services/core/ApiError';
import { useQuery } from '@tanstack/react-query';
import { getCldImageUrl } from 'next-cloudinary';

export const GET_CURRENT_SESSION_KEY = () => 'GET_CURRENT_SESSION_KEY';

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async (): Promise<
      Partial<Session['data']> & { isAuth: boolean }
    > => {
      try {
        const { data } = await AuthenticationService.getCurrentSession();

        let avatar = data?.avatar;

        if (avatar?.startsWith('version')) {
          avatar = getCldImageUrl({
            src: `${env?.cloudinaryProfilePublicID}/${avatar}`,
          });
        }

        return {
          isAuth: true,
          ...data,
          avatar,
        };
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.body.error.code === 401) {
            return {
              isAuth: false,
            };
          }
        }

        return {
          isAuth: false,
        };
      }
    },
    staleTime: 1000 * 60 * 3,
  });
}
