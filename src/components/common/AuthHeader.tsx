'use client';

import React from 'react';
import Logo from './Logo';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthHeader = () => {
  const pathname = usePathname();

  return (
    <header>
      <div className="container flex justify-between items-center h-24">
        <Logo />

        <div className="space-x-3">
          {pathname !== '/signup' && (
            <Link href="/signup">
              <Button size="xs" className="rounded-full text-xs">
                Create account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
