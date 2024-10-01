import React from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import SidebarNavigation from '@/components/common/SidebarNavigation';
import CenterContainer from '@/components/common/Container/CenterContainer';
import MessageList from '@/features/messages/MessageList';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header
        menu={
          <>
            <HeaderMenuLink
              href="/login"
              label="Login account"
              renderWhen="unauthenticated"
            />
            <HeaderMenuLink
              href="/post"
              label="Create post"
              renderWhen="authenticated"
            />
          </>
        }
      />

      <div className="flex flex-1 justify-between lg:container mt-5 px-2 md:px-4">
        <Sidebar position="left" className="hidden md:block">
          <SidebarNavigation />
        </Sidebar>

        <main className="flex flex-1">
          <CenterContainer>{children}</CenterContainer>
        </main>

        <Sidebar
          position="right"
          className="hidden xl:block"
          includedRoutes={['/messages']}
        >
          <MessageList />
        </Sidebar>
      </div>
    </>
  );
}
