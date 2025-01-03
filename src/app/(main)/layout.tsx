import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import CenterContainer from '@/containers/CenterContainer';
import MainContainer from '@/containers/MainContainer';
import BodyContainer from '@/containers/BodyContainer';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import ChatSidebar from '@/components/modules/Chat/Chat/ChatSidebar';
import UserOverviewCard from '@/components/modules/User/UserOverviewCard';
import Navigator from '@/components/common/Navigator/Navigator';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainContainer>
        <Header />
        <BodyContainer>
          <Sidebar position="left" includedRoutes={['/feed', '/friends']}>
            <UserOverviewCard />
            <Navigator />
          </Sidebar>

          <CenterContainer>{children}</CenterContainer>

          <Sidebar position="right" includedRoutes={['/']}>
            <ChatSidebar />
          </Sidebar>
        </BodyContainer>
      </MainContainer>
    </>
  );
};

export default MainLayout;
