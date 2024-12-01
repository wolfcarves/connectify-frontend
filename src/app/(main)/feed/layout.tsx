import FeedCategories from '@/features/feed/FeedCategories';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <FeedCategories />
      {children}
    </>
  );
};

export default layout;
