'use client';

import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const UserProfileTabs = () => {
  const { username } = useParams<{ username: string }>();

  const TABS = [
    { href: `/${username}`, title: 'Posts' },
    { href: `/${username}/friends`, title: 'Friends' },
    { href: `/${username}/photos`, title: 'Photos' },
    { href: `/${username}/about`, title: 'About' },
  ] as const;

  const pathname = usePathname();

  return (
    <div className="mt-5 mb-10">
      <ul className="flex items-center border-b">
        {TABS.map(({ href, title }) => {
          const isActive = href === pathname;

          return (
            <Link key={title} {...{ href }}>
              <li
                className={`${isActive && 'border-b-2 border-b-primary'} w-max py-2 px-4`}
              >
                <Typography.Span
                  title={title}
                  weight={isActive ? 'semibold' : 'normal'}
                  color={isActive ? 'primary' : 'foreground'}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default UserProfileTabs;
