'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useParams, usePathname } from 'next/navigation';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import {
  Bell,
  BookmarkSimple,
  ChatCircle,
  GearSix,
  HouseLine,
  User,
  Users,
} from '@phosphor-icons/react';

export let navigation = [
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
    icon: <BookmarkSimple size={20} />,
    label: 'Saved',
    href: '/saved',
  },
  {
    id: 4,
    icon: <ChatCircle size={20} />,
    label: 'Chats',
    href: '/chats',
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

const NavigationTab = () => {
  const { username } = useParams<{ username: string }>();

  const { data: session } = useGetCurrentSession();
  const pathname = usePathname();

  return (
    <nav className="fixed md:static bottom-0 start-0 end-0 h-14 md:h-auto w-full md:w-auto border-t md:border-t-0 bg-background md:pe-5 md:my-5">
      <ul className="flex flex-row md:flex-col w-full h-full">
        {navigation.map(({ id, icon, label, href }) => {
          navigation[5].href = `/${session?.username}`;

          const isCurrentPageProfile =
            label === 'Profile' &&
            session?.username === username &&
            session?.username;

          const isActive = href === pathname || isCurrentPageProfile;

          return (
            <React.Fragment key={id}>
              {/* Sidebar Item */}
              <Link href={href} className="hidden md:block">
                <Button
                  size="lg"
                  variant={isActive ? 'default' : 'ghost'}
                  className="justify-start w-full rounded-full px-5"
                  icon={icon}
                >
                  {label}
                </Button>
              </Link>

              {/* Bottom Tab Item */}
              <Link
                href={href}
                className={`${isActive ? 'text-foreground' : 'text-foreground/50'} flex md:hidden flex-grow justify-center items-center w-full h-full`}
              >
                <li>{icon}</li>
              </Link>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationTab;
