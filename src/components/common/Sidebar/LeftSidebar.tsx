'use client';

import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';
import User from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import useSession from '@/hooks/useSession';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bookmarks, ChatCircle, Rss, Users } from '@phosphor-icons/react';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { avatar, name, username, friends_count } = useSession();

  return (
    <Sidebar position="left">
      <Link href={`/${username}`}>
        <div className="p-2.5 rounded-2xl border bg-card hover:opacity-80">
          <User
            avatar={avatar}
            name={name}
            username={username}
            clickable={false}
          />

          <div className="flex justify-around items-center mt-2.5">
            <div className="flex flex-col text-center">
              <Typography.Span title="Posts" size="xs" weight="medium" />
              <Typography.Span title="80" size="xs" color="muted" />
            </div>
            <div className="flex flex-col text-center">
              <Typography.Span title="Friends" size="xs" weight="medium" />
              <Typography.Span title={friends_count} size="xs" color="muted" />
            </div>
            <div className="flex flex-col text-center">
              <Typography.Span title="Saved" size="xs" weight="medium" />
              <Typography.Span title="80" size="xs" color="muted" />
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-2 py-4">
        <div className="rounded-2xl border bg-card hover:opacity-90 p-2.5">
          <Button
            size="xs"
            variant="ghost"
            className="w-full justify-start rounded-lg"
            onClick={() => router.push('/feed')}
          >
            <Rss
              size={17}
              className={`${pathname === '/feed' || pathname === '/feed/friends' || pathname === '/feed/trending' ? 'text-primary' : ''} w-4`}
            />
            <Typography.Span
              title="Feed"
              size="sm"
              weight="medium"
              color={
                pathname === '/feed' ||
                pathname === '/feed/friends' ||
                pathname === '/feed/trending'
                  ? 'primary'
                  : 'foreground'
              }
            />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            className="w-full justify-start rounded-lg"
            onClick={() => router.push('/friends')}
          >
            <Users
              size={20}
              className={`${pathname === '/friends' && 'text-primary'} w-4`}
            />
            <Typography.Span
              title="Friends"
              size="sm"
              weight="medium"
              color={pathname === '/friends' ? 'primary' : 'foreground'}
            />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            className="w-full justify-start rounded-lg"
            onClick={() => router.push('/saved')}
          >
            <Bookmarks
              size={20}
              className={`${pathname === '/saved' && 'text-primary'} w-4`}
            />
            <Typography.Span
              title="Saved"
              size="sm"
              weight="medium"
              color={pathname === '/saved' ? 'primary' : 'foreground'}
            />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            className="w-full justify-start rounded-lg"
            onClick={() => router.push('/chats')}
          >
            <ChatCircle
              size={17}
              className={`${pathname === '/chats' && 'text-primary'} w-4`}
            />
            <Typography.Span
              title="Chats"
              size="sm"
              weight="medium"
              color={pathname === '/chats' ? 'primary' : 'foreground'}
            />
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default LeftSidebar;
