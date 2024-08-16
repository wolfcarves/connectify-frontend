import { withAuthGuard } from '@/higher-order/withAuthGuard';
import React from 'react';

const FriendsPage = () => {
  return <div>FriendsPage</div>;
};
export default withAuthGuard(FriendsPage);
