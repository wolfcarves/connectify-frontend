'use client';

import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FeedCategories = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-x-6 items-center">
      <Link href="/feed" className="hover:opacity-70">
        <Typography.H6
          title="Discover"
          weight="medium"
          color={pathname === '/feed' ? 'primary' : 'muted'}
        />
      </Link>

      <Link href="/feed/friends" className="hover:opacity-70">
        <Typography.H6
          title="Connections"
          weight="medium"
          color={pathname === '/feed/friends' ? 'primary' : 'muted'}
        />
      </Link>

      <Link href="/feed/trending" className="hover:opacity-70">
        <Typography.H6
          title="Trending"
          weight="medium"
          color={pathname === '/feed/trending' ? 'primary' : 'muted'}
        />
      </Link>
    </div>
  );
};

export default FeedCategories;
