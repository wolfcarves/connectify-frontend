import React from 'react';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const NotificationsPage = () => {
  return <div>NotificationsPage</div>;
};

export default withAuthGuard(NotificationsPage);
