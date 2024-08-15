import React from 'react';
import UserPosts from '@/features/feed/cards/UserPosts';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const HomePage = () => {
  return (
    <>
      <UserPosts />
    </>
  );
};

export default HomePage;
