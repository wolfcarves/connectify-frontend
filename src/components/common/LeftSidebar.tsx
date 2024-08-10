'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    id: 1,
    label: 'My Feed',
    href: '/',
  },
  {
    id: 2,
    label: 'Groups',
    href: '/groups',
  },
  {
    id: 3,
    label: 'Messages',
    href: '/messages',
  },
  {
    id: 4,
    label: 'Bookmarks',
    href: '/bookmarks',
  },
  {
    id: 5,
    label: 'Notifications',
    href: '/notifications',
  },
];

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex-grow max-w-[15rem]">
      <nav>
        <ul>
          {navigation.map(({ id, label, href }) => {
            const isActive = href === pathname;

            return (
              <li key={id}>
                <Link href={href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="justify-start w-full px-6"
                  >
                    {label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
