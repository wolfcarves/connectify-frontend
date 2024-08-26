import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import SidebarNavigation from '@/components/common/SidebarNavigation';
import CenterContainer from '@/components/common/Container/CenterContainer';

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

      <div className="lg:container flex justify-between mt-5 px-2 md:px-4">
        <Sidebar className="hidden md:block">
          <SidebarNavigation />
        </Sidebar>

        <main className="flex-grow">
          <CenterContainer>{children}</CenterContainer>
        </main>

        <Sidebar className="hidden xl:block" />
      </div>
    </>
  );
}
