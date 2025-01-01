'use client';

import Sidebar from '../Sidebar';
import UserOverviewCard from '@/components/modules/User/UserOverviewCard';
import Navigator from '../../Navigator/Navigator';

const LeftSidebar = () => {
  return (
    <Sidebar position="left" includedRoutes={['/feed']}>
      <UserOverviewCard />
      <Navigator />
    </Sidebar>
  );
};

export default LeftSidebar;
