'use client';

import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import UserPosts from '../cards/UserPosts';
import useSession from '@/hooks/useSession';

const UserProfilePostTab = () => {
  const { userId } = useSession();
  const { data: userPosts } = useGetAllUserPosts(userId);

  return (
    <>
      <UserPosts data={userPosts} />
    </>
  );
};

export default UserProfilePostTab;
