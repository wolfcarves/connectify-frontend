'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useParams, usePathname } from 'next/navigation';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import {
  Bell,
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
    icon: <ChatCircle size={20} />,
    label: 'Messages',
    href: '/messages',
  },
  {
    id: 4,
    icon: <Bell size={20} />,
    label: 'Notifications',
    href: '/notifications',
  },
  {
    id: 5,
    icon: <User size={20} />,
    label: 'Profile',
    href: '/',
  },
  {
    id: 6,
    icon: <GearSix size={20} />,
    label: 'Account Settings',
    href: '/account-settings',
  },
];

const NavigationTab = () => {
  const { username } = useParams<{ username: string }>();

  const { data: session } = useGetCurrentSession();
  const pathname = usePathname();

  useEffect(() => {
    navigation[4].href = `/${session?.username}`;
  }, [session?.username]);

  return (
    // <div className="flex md:hidden fixed bottom-0 start-0 end-0 h-14 w-full bg-background border-t"></div>
    <nav className="fixed md:static bottom-0 start-0 end-0 h-14 md:h-auto w-full md:w-auto border-t md:border-t-0 bg-background md:pe-5 md:my-5">
      <ul className="flex flex-row md:flex-col w-full h-full">
        {navigation.map(({ id, icon, label, href }) => {
          const isCurrentPageProfile =
            label === 'Profile' &&
            session?.username === username &&
            session?.username;

          const isActive = href === pathname || isCurrentPageProfile;

          return (
            <>
              {/* Sidebar Item */}
              <li key={id} className="hidden md:block">
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

              {/* Bottom Tab Item */}

              <Link
                key={id}
                href={href}
                className="flex md:hidden flex-grow justify-center items-center w-full h-full"
              >
                <li>{icon}</li>
              </Link>
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationTab;
