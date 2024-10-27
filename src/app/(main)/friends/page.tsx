import React from 'react';
import FriendSuggestionList from '@/features/friends/FriendSuggestionList';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const FriendsPage = () => {
  return (
    <>
      <FriendSuggestionList />
    </>
  );
};

export default withAuthGuard(FriendsPage);
