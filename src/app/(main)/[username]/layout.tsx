import UserProfileImage from '@/features/user/UserProfileImage';
import UserProfileTabs from '@/features/user/UserProfileTabs';
import React, { type ReactNode } from 'react';

interface SearchParams {
  username: string;
}

interface UserProfileLayout {
  children: ReactNode;
  params: SearchParams;
}

const UserProfileLayout = ({ children, params }: UserProfileLayout) => {
  return (
    <>
      <UserProfileImage username={params.username} />
      <UserProfileTabs username={params.username} />
      {children}
    </>
  );
};

export default UserProfileLayout;
