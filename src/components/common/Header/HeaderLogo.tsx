import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';

const HeaderLogo = () => {
  return (
    <div className="flex items-center">
      <Link href="/feed">
        <Logo />
      </Link>
    </div>
  );
};

export default HeaderLogo;
