'use client';

import Typography from '@/components/ui/typography';
import useGetFriendRequests from '@/hooks/queries/useGetFriendRequests';
import FriendCard from '@/components/modules/Friend/FriendCard';
import FriendListSkeleton from '../skeleton/FriendListSkeleton';

const FriendRequestList = () => {
  const { data: friendRequests, isPending: isFriendRqeeustsLoading } =
    useGetFriendRequests();

  if (isFriendRqeeustsLoading) {
    return <FriendListSkeleton title="Friend Requests" />;
  }

  return (
    <div className="pb-10">
      <Typography.H4 title="Friend Requests" className="my-5" weight="medium" />

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3 min-h-[10rem]">
        {friendRequests!.length == 0 && (
          <Typography.Span title="No friend request yet." color="muted" />
        )}

        {friendRequests?.map(props => {
          const { id: requestId, user } = props;

          return <FriendCard key={requestId} type="request" {...user} />;
        })}
      </div>
    </div>
  );
};

export default FriendRequestList;
