'use client';

import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FeedCategories = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-x-4 items-center">
      <Link href="/feed" className="hover:opacity-70">
        <Typography.H6
          title="Discover"
          weight={pathname === '/feed' ? 'medium' : 'normal'}
          color={pathname === '/feed' ? 'primary' : 'foreground'}
        />
      </Link>

      <Link href="/feed/friends" className="hover:opacity-70">
        <Typography.H6
          title="Connections"
          weight={pathname === '/feed/friends' ? 'medium' : 'normal'}
          color={pathname === '/feed/friends' ? 'primary' : 'foreground'}
        />
      </Link>

      <Link href="/feed/trending" className="hover:opacity-70">
        <Typography.H6
          title="Trending"
          weight={pathname === '/feed/trending' ? 'medium' : 'normal'}
          color={pathname === '/feed/trending' ? 'primary' : 'foreground'}
        />
      </Link>
    </div>
  );
};

export default FeedCategories;
