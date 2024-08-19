import { env } from '@/config/env';
import useGetCurrentSession from './queries/useGetCurrentSession';
import { getCldImageUrl } from 'next-cloudinary';

export default function useSession() {
  const { data: session, isLoading: isSessionLoading } = useGetCurrentSession();

  let avatar = session?.avatar;

  // Says the image is from cloudinary not the template ones
  if (session?.avatar.startsWith('version'))
    avatar = getCldImageUrl({
      src: `${env?.cloudinaryProfilePublicID}/${session?.avatar}`,
    });

  console.log(avatar);

  return {
    userId: session?.id,
    avatar: avatar,
    isAuth: !!session?.id,
    email: session?.email,
    name: session?.name,
    username: session?.username,
    isLoading: isSessionLoading,
  };
}
