import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import getCloudinaryImageUrl from '@/utils/getCloudinaryImageUrl';

interface QueryParams {
  userId?: number;
  username?: string;
}

export const GET_USER_PROFILE_KEY = () => 'GET_USER_PROFILE_KEY';

export default function useGetUserProfile({ userId, username }: QueryParams) {
  return useQuery({
    queryKey: [GET_USER_PROFILE_KEY()],
    queryFn: async () => {
      const response = await UserService.getUserProfile(userId, username);

      let avatar = response.data?.avatar;

      // Says the image is from cloudinary not the template ones
      if (response.data?.avatar.startsWith('version')) {
        try {
          avatar = getCloudinaryImageUrl(response.data.avatar);
        } catch (err: any) {
          console.log('Error!', { ...err });
        }
      }

      return {
        ...response.data,
        avatar,
      };
    },
  });
}
