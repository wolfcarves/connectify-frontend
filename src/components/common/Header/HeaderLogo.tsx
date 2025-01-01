import React from 'react';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Link from 'next/link';
import Logo from '../Logo';
import { Skeleton } from '@/components/ui/skeleton';

const HeaderLogo = () => {
  const { isPending } = useGetCurrentSession();

  return (
    <div className="w-[16rem]">
      <div className="flex items-center">
        {isPending ? (
          <Skeleton className="w-11 h-11 rounded-full" />
        ) : (
          <Link href="/feed">
            <Logo />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderLogo;
