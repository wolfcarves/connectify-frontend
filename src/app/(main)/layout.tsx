import React from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import NavigationTab from '@/components/common/NavigationTab';
import CenterContainer from '@/components/common/Container/CenterContainer';
import LeftSidebar from '@/components/common/Sidebar/LeftSidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-14 md:pb-0">
      <Header />

      <div className="flex flex-1 justify-between lg:container mt-5 px-2 md:px-4 py-10">
        <LeftSidebar />

        <main className="flex flex-1">
          <CenterContainer>{children}</CenterContainer>
        </main>

        <Sidebar
          position="right"
          className="hidden xl:block"
          includedRoutes={['/messages']}
        />
      </div>

      <div className="block md:hidden">
        <NavigationTab />
      </div>
    </div>
  );
}
