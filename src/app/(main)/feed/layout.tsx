import FeedCategories from '@/features/feed/FeedCategories';
import React, { ReactNode } from 'react';

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <FeedCategories />
      {children}
    </>
  );
};

export default FeedLayout;
