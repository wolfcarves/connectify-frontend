import React from 'react';
import { withAuthGuard } from '@/higher-order/withAuthGuard';
import UserProfilePosts from '@/features/user/UserProfilePosts';

interface SearchParams {
  params: { username: string };
}

const UserProfilePostsPage = async ({ params }: SearchParams) => {
  return (
    <>
      <UserProfilePosts username={params.username} />
    </>
  );
};

export default withAuthGuard(UserProfilePostsPage);
