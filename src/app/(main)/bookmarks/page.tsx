import { withAuthGuard } from '@/higher-order/withAuthGuard';
import React from 'react';

const Bookmarks = () => {
  return <div>Bookmarks</div>;
};
export default withAuthGuard(Bookmarks);
