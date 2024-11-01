'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useParams, usePathname } from 'next/navigation';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import {
  Bell,
  Bookmarks,
  ChatCircle,
  GearSix,
  HouseLine,
  User,
  Users,
} from '@phosphor-icons/react';

let navigation = [
  {
    id: 1,
    icon: <HouseLine size={20} />,
    label: 'My Feed',
    href: '/',
  },
  {
    id: 2,
    icon: <Users size={20} />,
    label: 'Friends',
    href: '/friends',
  },
  {
    id: 3,
    icon: <ChatCircle size={20} />,
    label: 'Messages',
    href: '/messages',
  },
  {
    id: 4,
    icon: <Bookmarks size={20} />,
    label: 'Bookmarks',
    href: '/bookmarks',
  },
  {
    id: 5,
    icon: <Bell size={20} />,
    label: 'Notifications',
    href: '/notifications',
  },
  {
    id: 6,
    icon: <User size={20} />,
    label: 'Profile',
    href: '/',
  },
  {
    id: 7,
    icon: <GearSix size={20} />,
    label: 'Account Settings',
    href: '/account-settings',
  },
];

const SidebarNavigation = () => {
  const { username } = useParams<{ username: string }>();

  const { data: session } = useGetCurrentSession();
  const pathname = usePathname();

  navigation[5].href = `/${session?.username}`;

  return (
    <nav className="pe-5 my-5">
      <ul>
        {navigation.map(({ id, icon, label, href }) => {
          const isCurrentPageProfile =
            label === 'Profile' && session?.username === username;
          const isActive = href === pathname || isCurrentPageProfile;

          return (
            <li key={id}>
              <Link href={href}>
                <Button
                  size="lg"
                  variant={isActive ? 'default' : 'ghost'}
                  className="justify-start w-full rounded-full px-5"
                  icon={icon}
                >
                  {label}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
