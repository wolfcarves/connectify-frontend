import type { ReactNode } from 'react';
import Header from '@/components/common/Header';
import LeftSidebar from '@/components/common/LeftSidebar';
import RightSidebar from '@/components/common/RightSidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

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
