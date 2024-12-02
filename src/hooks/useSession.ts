import { env } from '@/config/env';
import useGetCurrentSession from './queries/useGetCurrentSession';
import { getCldImageUrl } from 'next-cloudinary';

export default function useSession() {
  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useGetCurrentSession();

  let avatar = session?.avatar;

  // Says the image is from cloudinary not the template ones
  if (session?.avatar.startsWith('version'))
    avatar = getCldImageUrl({
      src: `${env?.cloudinaryProfilePublicID}/${session?.avatar}`,
    });

  return {
    userId: session?.id,
    avatar: avatar,
    isAuth: !!session?.id && !isSessionLoading && !isSessionError,
    email: session?.email,
    name: session?.name,
    username: session?.username,
    friends_count: session?.friends_count,
    isLoading: isSessionLoading,
  };
}
