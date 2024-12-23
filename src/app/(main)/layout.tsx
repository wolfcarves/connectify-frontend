import React from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import CenterContainer from '@/containers/CenterContainer';
import LeftSidebar from '@/components/common/Sidebar/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/common/Sidebar/RightSidebar';
import MainContainer from '@/containers/MainContainer';
import BodyContainer from '@/containers/BodyContainer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MainContainer>
      <Header />
      <BodyContainer>
        {/* <LeftSidebar /> */}
        <CenterContainer>{children}</CenterContainer>
        {/* <RightSidebar /> */}
      </BodyContainer>
    </MainContainer>
  );
}
