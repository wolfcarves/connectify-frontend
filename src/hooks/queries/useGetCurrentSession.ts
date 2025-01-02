import { env } from '@/config/env';
import { AuthenticationService } from '@/services';
import { ApiError } from '@/services/core/ApiError';
import { useQuery } from '@tanstack/react-query';
import { getCldImageUrl } from 'next-cloudinary';

export const GET_CURRENT_SESSION_KEY = () => 'GET_CURRENT_SESSION_KEY';

export default function useGetCurrentSession() {
  return useQuery({
    queryKey: [GET_CURRENT_SESSION_KEY()],
    queryFn: async () => {
      try {
        const { data } = await AuthenticationService.getCurrentSession();

        let avatar = data?.avatar;

        if (avatar?.startsWith('version')) {
          avatar = getCldImageUrl({
            src: `${env?.cloudinaryProfilePublicID}/${avatar}`,
          });
        }

        return {
          ...data,
          avatar,
        };
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.body.error.code === 401) {
          }
        }
      }
    },
    staleTime: 1000 * 60 * 3,
  });
}
