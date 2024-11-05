'use client';

import FriendCard from '@/components/modules/Friend/FriendCard';
import Typography from '@/components/ui/typography';
import useGetFriendList from '@/hooks/queries/useGetFriendList';
import useGetUserProfile from '@/hooks/queries/useGetUserProfile';
import { Spinner } from '@phosphor-icons/react';
import { useMemo } from 'react';

const UserProfileFriendList = ({ username }: { username: string }) => {
  const { data: userProfile } = useGetUserProfile({ username });
  const { data: friendList, isPending: isFriendListLoading } = useGetFriendList(
    userProfile?.id,
  );

  const hasFriend = useMemo(
    () => friendList && friendList?.length > 0,
    [friendList],
  );

  return (
    <>
      <Typography.H4 title="Friends" weight="semibold" className="my-7" />

      {isFriendListLoading ? (
        <Spinner size={20} className="animate-spin duration-1000" />
      ) : userProfile?.is_friend && !hasFriend ? (
        <Typography.Span
          title="No other friends"
          color="muted"
          className="my-4"
        />
      ) : !hasFriend ? (
        <Typography.Span title="No friends" color="muted" className="my-4" />
      ) : null}

      <div className="w-full xs:grid gap-3 space-y-3 xs:space-y-0 xs:grid-cols-2 min-h-[10rem]">
        {friendList?.map(props => <FriendCard key={props.id} {...props} />)}
      </div>
    </>
  );
};

export default UserProfileFriendList;
