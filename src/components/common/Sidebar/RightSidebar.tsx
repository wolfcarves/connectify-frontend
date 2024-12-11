'use client';

import Sidebar from './Sidebar';
import Typography from '@/components/ui/typography';
import useGetFriendList from '@/hooks/queries/useGetFriendList';
import useSession from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import Avatar from '../Avatar/Avatar';

const RightSidebar = () => {
  const router = useRouter();
  const { userId, avatar, name, username, friends_count } = useSession();

  const { data: friends } = useGetFriendList(userId);

  return (
    <Sidebar position="left">
      <div className="pe-1">
        <Typography.Span
          title="Recent"
          size="sm"
          color="muted"
          weight="semibold"
          className="uppercase"
        />

        <div className="rounded-2xl border bg-card px-2 mt-4">
          <div className="space-y-2 py-4">
            {friends?.map(({ id, avatar, name, username }) => (
              <button
                key={id}
                className="flex gap-x-2 items-center w-full rounded-xl hover:bg-muted/30 p-2"
                onClick={() => router.push(`/${username}`)}
              >
                <Avatar src={avatar} size="sm" />
                <div className="flex flex-col items-start">
                  <Typography.Span title={name} />
                  <Typography.Span title="Active" size="xs" color="muted" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default RightSidebar;
