import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import LeftSidebar from '@/components/common/LeftSidebar';
import RightSidebar from '@/components/common/RightSidebar';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';

export default function MainLayout({ children }: { children: ReactNode }) {
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

      <div className="lg:container flex justify-between mt-10 px-4">
        <LeftSidebar />

        <main className="flex-grow mx-auto w-full max-w-xl px-4">
          {children}
        </main>

        <RightSidebar />
      </div>
    </>
  );
}
