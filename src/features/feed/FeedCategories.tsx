'use client';

import Typography from '@/components/ui/typography';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FeedCategories = () => {
  const { data: session } = useGetCurrentSession();
  const pathname = usePathname();

  return (
    <div className="flex gap-x-6 items-center px-3 sm:px-0 py-4">
      <Link href="/feed" className="hover:opacity-70">
        <Typography.H6
          title="Discover"
          weight="medium"
          color={pathname === '/feed' ? 'primary' : 'muted'}
        />
      </Link>

      {session?.isAuth && (
        <Link href="/feed/friends" className="hover:opacity-70">
          <Typography.H6
            title="Connections"
            weight="medium"
            color={pathname === '/feed/friends' ? 'primary' : 'muted'}
          />
        </Link>
      )}

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
