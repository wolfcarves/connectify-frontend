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
  params: Promise<SearchParams>;
}

const UserProfileLayout = async ({ children, params }: UserProfileLayout) => {
  const { username } = await params;

  return (
    <div className="pt-10">
      <div className="flex justify-between items-end">
        <UserProfileImage username={username} />
        <UserProfileAction username={username} />
      </div>
      <UserProfileTabs username={username} />
      {children}
    </div>
  );
};

export default withAuthGuard(UserProfileLayout);
