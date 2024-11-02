'use client';

import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserProfileTabsProps {
  username?: string;
}

const UserProfileTabs = ({ username }: UserProfileTabsProps) => {
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
        {TABS.map(({ href, title }) => (
          <Link key={title} {...{ href }}>
            <li
              className={`${href === pathname && 'border-b-2 border-b-primary'} w-max py-2 px-4`}
            >
              <Typography.Span title={title} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileTabs;
