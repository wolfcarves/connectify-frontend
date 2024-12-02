'use client';

import { Button } from '../../ui/button';
import Link from 'next/link';
import { Plus } from '@phosphor-icons/react';
import { TbMessageCircle, TbMessageCircleFilled } from 'react-icons/tb';
import { PiBellFill, PiBell } from 'react-icons/pi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/common/Avatar/Avatar';
import useSession from '@/hooks/useSession';
import User from '@/components/modules/User/User';
import useDestroySession from '@/hooks/mutations/useDestroySession';
import Spinner from '@/components/ui/spinner';
import { usePathname } from 'next/navigation';
import { RiSettings4Fill } from 'react-icons/ri';
import Typography from '@/components/ui/typography';
import { IoLogOut } from 'react-icons/io5';

const HeaderMenu = () => {
  const pathname = usePathname();
  const { avatar, name, username, isAuth } = useSession();

  const {
    mutateAsync: destroySessionMutate,
    isPending: isDestroySessionLoading,
  } = useDestroySession();

  const handleLogout = async () => {
    try {
      const res = await destroySessionMutate();

      console.log('res', res);
    } catch (error) {
      console.log('error?');
    }
  };

  switch (pathname) {
    case '/signup':
      if (!isAuth)
        return (
          <Link href="/login">
            <Button className="rounded-full text-xs" size="sm">
              Login account
            </Button>
          </Link>
        );
    default:
      if (!isAuth)
        return (
          <Link href="/signup">
            <Button className="rounded-full text-xs" size="sm">
              Create account
            </Button>
          </Link>
        );
  }

  return (
    <DropdownMenu>
      <div className="flex gap-x-2 items-center">
        <Link href={'/create'}>
          <Button
            size="icon"
            variant={pathname === '/create' ? 'default' : 'secondary'}
            icon={<Plus size={20} />}
            className="rounded-full text-xs"
          />
        </Link>

        <Link href={'/chats'}>
          <Button
            size="icon"
            variant={pathname === '/chats' ? 'default' : 'secondary'}
            icon={
              pathname === '/chats' ? (
                <TbMessageCircleFilled size={20} />
              ) : (
                <TbMessageCircle size={20} />
              )
            }
            className="rounded-full text-xs"
          />
        </Link>

        <Link href={'/notifications'}>
          <Button
            size="icon"
            variant={pathname === '/notifications' ? 'default' : 'secondary'}
            icon={
              pathname === '/notifications' ? (
                <PiBellFill size={20} />
              ) : (
                <PiBell size={20} />
              )
            }
            className="rounded-full text-xs"
          />
        </Link>

        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            icon={<Avatar src={avatar} size="base" />}
            className="rounded-full mt-auto text-xs bg-blue-500"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[250px] rounded-lg">
          <Link href={`/${username}`}>
            <DropdownMenuItem>
              <div className="hover:bg-muted p-1">
                <User
                  avatar={avatar}
                  name={name}
                  username={username}
                  clickable={false}
                />
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <Link href="/account-settings">
            <DropdownMenuItem className="p-2.5">
              <div className="flex gap-x-2 items-center ">
                <RiSettings4Fill size={24} className="w-6" />
                <Typography.Span title="Settings" weight="medium" size="sm" />
              </div>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="p-2.5" onClick={handleLogout}>
            <div className="flex gap-x-2 items-center">
              {isDestroySessionLoading ? (
                <Spinner />
              ) : (
                <IoLogOut size={24} className="w-6" />
              )}
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default HeaderMenu;
