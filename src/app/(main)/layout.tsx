import type { ReactNode } from 'react';
import Header from '@/components/common/Header';
import LeftSidebar from '@/components/common/LeftSidebar';
import RightSidebar from '@/components/common/RightSidebar';
import Link from 'next/link';

export default function MainLayout({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Header />

      <div className="container flex justify-between mt-10">
        <LeftSidebar />

        <main className="flex-grow mx-auto w-full max-w-xl">
          {children}
          {content}
        </main>

        <RightSidebar />
      </div>
    </>
  );
}
