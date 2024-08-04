import React from 'react';
import Logo from './Logo';
import { Button } from '../ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="container flex justify-between items-center h-16">
        <Link href="/">
          <Logo />
        </Link>

        <div className="space-x-3">
          <Link href="/login">
            <Button
              variant="outline"
              size="xs"
              className="rounded-full text-xs"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button size="xs" className="rounded-full text-xs">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
