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
              href="/create"
              label="Create post"
              renderWhen="authenticated"
            />
          </>
        }
      />

      <div className="lg:container mt-5 px-1 sm:px-4 md:px-20">
        <Sidebar position="left" />
        <CenterContainer>{children}</CenterContainer>
        <Sidebar position="right" />
      </div>
    </>
  );
}
