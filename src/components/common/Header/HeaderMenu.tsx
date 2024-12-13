'use client';

import { useState } from 'react';
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
import { useClickOutside } from '@mantine/hooks';
import ChatDropdownList from '@/features/chats/ChatDropdownList';
import ChatBox from '@/features/chats/ChatBox';
import ChatDropdown from '@/features/chats/ChatDropdown';

const HeaderMenu = () => {
  const pathname = usePathname();
  const { isAuth } = useSession();

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
    <div className="flex items-center gap-x-4">
      <Link href={'/create'}>
        <Button
          variant={pathname === '/create' ? 'default' : 'secondary'}
          className="text-xs"
        >
          Create Post
          <Plus size={14} />
        </Button>
      </Link>

      <div className="flex items-center gap-x-2">
        <ChatDropdown />
        <HeaderMenuNotificationsDropdown />
        <HeaderMenuProfileDropdown />
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

const HeaderMenuProfileDropdown = () => {
  const { avatar, name, username } = useSession();

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

  return (
    <DropdownMenu>
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
    </DropdownMenu>
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
