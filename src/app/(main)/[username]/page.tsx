import React from 'react';
import UserProfileImage from '@/features/user/UserProfileImage';
import UserProfilePosts from '@/features/user/UserProfilePosts';
import UserProfileTab from '@/features/user/UserProfileTab';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

interface SearchParams {
  params: { username: string };
}

const UserProfilePage = async ({ params }: SearchParams) => {
  return (
    <>
      <UserProfileImage username={params.username} />
      <UserProfileTab />
      <UserProfilePosts username={params.username} />
    </>
  );
};

export default withAuthGuard(UserProfilePage);
