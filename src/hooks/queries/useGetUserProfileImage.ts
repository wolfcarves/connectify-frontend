import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { env } from '@/config/env';
import { getCldImageUrl } from 'next-cloudinary';

export const GET_USER_PROFILE_IMAGE_KEY = () => 'GET_USER_PROFILE_IMAGE';

export default function useGetUserProfileImage() {
  return useQuery({
    queryKey: [GET_USER_PROFILE_IMAGE_KEY()],
    queryFn: async () => {
      const response = await UserService.getUserProfileImage();

      const avatar = getCldImageUrl({
        src: `${env?.cloudinaryProfilePublicID}/${response.data.avatar}`,
      });

      return {
        avatar: avatar ?? 'default_avatar.svg',
      };
    },
  });
}
