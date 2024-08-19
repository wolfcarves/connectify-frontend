'use client';

import { Button } from '../../ui/button';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Link from 'next/link';

const HeaderMenuLink = ({
  href,
  label,
  renderWhen = 'unauthenticated',
}: {
  href: string;
  label: string;
  renderWhen?: 'authenticated' | 'unauthenticated';
}) => {
  const { data: session } = useGetCurrentSession();
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

  if (!isAuth && renderWhen === 'unauthenticated') {
    return Component;
  }

  if (isAuth && renderWhen === 'authenticated') {
    return Component;
  }

  return <></>;
};

export default HeaderMenuLink;
