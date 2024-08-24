import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import HeaderMenuLink from '@/components/common/Header/HeaderMenuLink';
import Sidebar from '@/components/common/Sidebar';
import CenterContainer from '@/components/common/Container/CenterContainer';

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

      <div className="lg:container flex justify-between mt-5 px-4">
        <Sidebar />

        <CenterContainer>{children}</CenterContainer>

        <Sidebar />
      </div>
    </>
  );
}
