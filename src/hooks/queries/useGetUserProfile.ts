import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import getCloudinaryProfileImageUrl from '@/utils/getCloudinaryProfileImageUrl';

interface QueryParams {
  userId?: number;
  username?: string;
}

export const GET_USER_PROFILE_KEY = () => 'GET_USER_PROFILE_KEY';

export default function useGetUserProfile({ userId, username }: QueryParams) {
  return useQuery({
    queryKey: [GET_USER_PROFILE_KEY(), userId, username],
    queryFn: async () => {
      const response = await UserService.getUserProfile({ userId, username });

      let avatar = response.data?.avatar;

      // Says the image is from cloudinary not the template ones
      if (response.data?.avatar.startsWith('version')) {
        try {
          avatar = getCloudinaryProfileImageUrl(response.data.avatar) ?? '';
        } catch (err: any) {
          //
        }
      }

      return {
        ...response.data,
        avatar,
      };
    },
    enabled: !!userId || !!username,
  });
}
