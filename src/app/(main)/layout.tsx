import React from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import CenterContainer from '@/containers/CenterContainer';
import LeftSidebar from '@/components/common/Sidebar/LeftSidebar/LeftSidebar';
import RightSidebar from '@/components/common/Sidebar/RightSidebar';
import MainContainer from '@/containers/MainContainer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MainContainer>
      <Header />
      <div className="flex flex-1 lg:container mt-5 px-2 md:px-4 py-10">
        <LeftSidebar />
        <CenterContainer>{children}</CenterContainer>
        <RightSidebar />
      </div>
    </MainContainer>
  );
}
