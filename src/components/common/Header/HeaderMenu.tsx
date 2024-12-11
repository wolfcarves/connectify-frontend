'use client';

import { useRef, useState } from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { Plus } from '@phosphor-icons/react';
import { TbMessageCircle, TbMessageCircleFilled } from 'react-icons/tb';
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
import { PiBellFill, PiBell } from 'react-icons/pi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useClickOutside } from '@mantine/hooks';

const HeaderMenu = () => {
  const pathname = usePathname();
  const { avatar, name, username, isAuth } = useSession();

  const {
    mutateAsync: destroySessionMutate,
    isPending: isDestroySessionLoading,
  } = useDestroySession();

  const handleLogout = async () => {
    try {
      await destroySessionMutate();
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
            className="text-xs"
          />
        </Link>

        <HeaderMenuChatsDropdown />
        <HeaderMenuNotificationsDropdown />

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

const HeaderMenuChatsDropdown = () => {
  const { avatar } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      <Button
        size="icon"
        variant={isOpen ? 'default' : 'secondary'}
        className="text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
        icon={
          isOpen ? (
            <TbMessageCircleFilled size={20} />
          ) : (
            <TbMessageCircle size={20} />
          )
        }
        onClick={() => setIsOpen(prev => !prev)}
      />

      <div
        ref={popupRef}
        className={`${!isOpen && 'hidden'} absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl`}
      >
        <div className="p-2">
          <Typography.Span
            title="Messages"
            color="muted"
            className="uppercase"
            weight="medium"
            size="sm"
          />
        </div>

        <div className="relative">
          <div className="flex gap-x-2 text-start w-full hover:bg-muted/50 hover:cursor-pointer p-3">
            <Avatar src={avatar} size="lg" />
            <div className="flex flex-col">
              <Typography.Span title="Rodel Crisosto" weight="medium" />
              <Typography.Span
                title="Kumusta na par?"
                className="line-clamp-3"
                size="sm"
                color="muted"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute right-5 top-0 bottom-0 my-auto rounded-full hover:bg-muted"
            icon={<HiDotsHorizontal size={20} className="text-foreground/90" />}
            size="icon"
          />
        </div>
      </div>
    </div>
  );
};

const HeaderMenuNotificationsDropdown = () => {
  const { avatar } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      <Button
        size="icon"
        variant={isOpen ? 'default' : 'secondary'}
        className="text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setIsOpen(prev => !prev)}
        icon={isOpen ? <PiBellFill size={20} /> : <PiBell size={20} />}
      />

      <div
        ref={popupRef}
        className={`${!isOpen && 'hidden'} absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl`}
      >
        <div className="p-2">
          <Typography.Span
            title="Notifications"
            color="muted"
            className="uppercase"
            weight="medium"
            size="sm"
          />
        </div>

        <button className="flex items-center gap-x-2 w-full hover:bg-muted/50 p-3">
          <Avatar src={avatar} size="lg" />
          <Typography.Span
            title="Rodel Crisosto likes your post"
            className="line-clamp-3"
          />
        </button>
      </div>
    </div>
  );
};

export default HeaderMenu;

/*
 <div className="absolute right-0 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl">
        <div className="p-2">
          <Typography.Span
            title="Messages"
            color="muted"
            className="uppercase"
            weight="medium"
            size="sm"
          />
        </div>

        <button className="flex items-center gap-x-2 w-full hover:bg-muted/50 p-3">
          <Avatar src={avatar} size="lg" />
          <Typography.Span
            title="Rodel Crisosto likes your post"
            className="line-clamp-3"
          />
        </button>
      </div>  
*/
