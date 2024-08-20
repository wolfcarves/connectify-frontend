'use client';

import React, { ReactNode } from 'react';
import { usePrefetchGetCurrentSession } from '@/hooks/queries/useGetCurrentSession';

const UserProfilePageContainer = ({ children }: { children?: ReactNode }) => {
  usePrefetchGetCurrentSession();

  return <>{children}</>;
};

export default UserProfilePageContainer;
