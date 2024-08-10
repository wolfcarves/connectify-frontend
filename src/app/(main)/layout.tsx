import type { ReactNode } from 'react';
import LoginPage from '../(auth)/login/page';
import Header from '@/components/common/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LeftSidebar from '@/components/common/LeftSidebar';
import RightSidebar from '@/components/common/RightSidebar';

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  const isAuth = true;

  if (!isAuth) return <LoginPage />;

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
