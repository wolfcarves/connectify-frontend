import { User, UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { getCldImageUrl } from 'next-cloudinary';
import { env } from 'process';

export default function useGetUserProfile(userId: number) {
  return useQuery({
    queryKey: ['GET_USER_PROFILE_KEY'],
    queryFn: async () => {
      const response = await UserService.getUserProfile(userId);

      let avatar = response.data?.avatar;

      // Says the image is from cloudinary not the template ones
      if (response.data?.avatar.startsWith('version'))
        avatar = getCldImageUrl({
          src: `${env?.cloudinaryProfilePublicID}/${response.data?.avatar}`,
        });

      return {
        ...response.data,
        avatar,
      };
    },
  });
}
