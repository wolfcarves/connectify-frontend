import React from 'react';
import UserProfilePosts from '@/features/username/posts/UserProfilePosts';

interface Params {
  username: string;
}

const UserProfilePostsPage = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { username } = await params;

  return (
    <>
      <UserProfilePosts username={username} />
    </>
  );
};

export default UserProfilePostsPage;
