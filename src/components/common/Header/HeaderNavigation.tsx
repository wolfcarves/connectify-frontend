'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { BookmarkSimple, HouseLine, Users } from '@phosphor-icons/react';

export let navigation = [
  {
    id: 1,
    icon: <HouseLine size={20} />,
    label: 'Home',
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
];

const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="ms-24">
      <NavigationMenuList>
        {navigation.map(({ id, icon, label, href }) => {
          const isActive = href === pathname;

          return (
            <NavigationMenuItem key={id}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${!isActive && 'text-foreground/80 font-normal'} gap-2`}
                >
                  {icon}
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderNavigation;
