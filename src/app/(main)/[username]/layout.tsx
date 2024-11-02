import React, { type ReactNode } from 'react';
import UserProfileImage from '@/features/user/UserProfileImage';
import UserProfileTabs from '@/features/user/UserProfileTabs';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

interface SearchParams {
  username: string;
}

interface UserProfileLayout {
  children: ReactNode;
  params: SearchParams;
}

const UserProfileLayout = ({ children, params }: UserProfileLayout) => {
  return (
    <div className="mt-10">
      <UserProfileImage username={params.username} />
      <UserProfileTabs username={params.username} />
      {children}
    </div>
  );
};

export default withAuthGuard(UserProfileLayout);
