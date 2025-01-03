'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';

const HeaderLogo = () => {
  return (
    <div className="w-[16rem]">
      <div className="flex items-center">
        <Link href="/feed">
          <Logo size="base" />
        </Link>
      </div>
    </div>
  );
};

export default HeaderLogo;
