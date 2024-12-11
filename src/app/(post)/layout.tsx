import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import CenterContainer from '@/containers/CenterContainer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <div className="lg:container mt-5 px-1 sm:px-4 md:px-20">
        <Sidebar position="left" />
        <CenterContainer>{children}</CenterContainer>
        <Sidebar position="right" />
      </div>
    </>
  );
}
