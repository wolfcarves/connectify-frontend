'use client';

import { Button } from '../../ui/button';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderMenuLink = ({
  href,
  label,
  renderWhen = 'unauthenticated',
}: {
  href: string;
  label: string;
  renderWhen?: 'authenticated' | 'unauthenticated';
}) => {
  const { data: session, isPending: isSessionLoading } = useGetCurrentSession();
  const isAuth = !!session?.id;

  const Component = (
    <Link href={href}>
      <Button
        size="xs"
        className="rounded-full text-xs"
        onClick={() => console.log(href)}
      >
        {label}
      </Button>
    </Link>
  );

  if (isSessionLoading) return <></>;

  if (isAuth && renderWhen === 'authenticated') {
    return Component;
  }

  if (!isAuth && renderWhen === 'unauthenticated') {
    return Component;
  }

  return <></>;
};

export default HeaderMenuLink;
