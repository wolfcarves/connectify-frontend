import React, { type ReactNode } from 'react';
import UserProfileImage from '@/features/username/UserProfileImage';
import UserProfileTabs from '@/features/username/UserProfileTabs';
import { withAuthGuard } from '@/higher-order/withAuthGuard';
import UserProfileAction from '@/features/username/UserProfileAction';

interface SearchParams {
  username: string;
}

interface UserProfileLayout {
  children: ReactNode;
  params: SearchParams;
}

const UserProfileLayout = ({ children, params }: UserProfileLayout) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between items-end">
        <UserProfileImage username={params.username} />
        <UserProfileAction username={params.username} />
      </div>
      <UserProfileTabs username={params.username} />
      {children}
    </div>
  );
};

export default withAuthGuard(UserProfileLayout);
