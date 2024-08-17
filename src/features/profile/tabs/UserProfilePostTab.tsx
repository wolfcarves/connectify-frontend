'use client';

import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import useSession from '@/hooks/useSession';

const UserProfilePostTab = () => {
  const { userId } = useSession();
  const { data: userPosts } = useGetAllUserPosts(userId);

  return <></>;
};

export default UserProfilePostTab;
