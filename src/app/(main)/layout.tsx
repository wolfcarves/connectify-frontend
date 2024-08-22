import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import SidebarNavigation from '@/components/common/SidebarNavigation';

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

      <div className="lg:container flex justify-between mt-5 px-4">
        <Sidebar className="hidden md:block">
          <SidebarNavigation />
        </Sidebar>

        <main className="flex-grow mx-auto w-full max-w-xl">{children}</main>

        <Sidebar />
      </div>
    </>
  );
}
