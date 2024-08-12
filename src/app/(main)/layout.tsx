import type { ReactNode } from 'react';
import Header from '@/components/common/Header';
import LeftSidebar from '@/components/common/LeftSidebar';
import RightSidebar from '@/components/common/RightSidebar';

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />

      <div className="container flex justify-between mt-10">
        <LeftSidebar />

        <main className="flex-grow mx-auto w-full max-w-xl">
          {/* Main Content */}
          {children}
        </main>

        <RightSidebar />
      </div>
    </>
  );
}
