import React, { type ReactNode } from 'react';
import UserProfileImage from '@/features/username/UserProfileImage';
import UserProfileTabs from '@/features/username/UserProfileTabs';
import UserProfileAction from '@/features/username/UserProfileAction';

interface UserProfileLayout {
  children: ReactNode;
}

const UserProfileLayout = ({ children }: UserProfileLayout) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between items-end">
        <UserProfileImage />
        <UserProfileAction />
      </div>
      <UserProfileTabs />
      {children}
    </div>
  );
};

export default UserProfileLayout;
