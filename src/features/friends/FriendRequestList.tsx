'use client';

import Typography from '@/components/ui/typography';
import useGetFriendRequests from '@/hooks/queries/useGetFriendRequests';
import FriendListSkeleton from './FriendListSkeleton';
import FriendRequestCard from '@/components/modules/Friend/FriendRequestCard';

const FriendRequestList = () => {
  const { data: friendRequests, isPending: isFriendRqeeustsLoading } =
    useGetFriendRequests();

  if (isFriendRqeeustsLoading) {
    return <FriendListSkeleton title="Friend Requests" />;
  }

  return (
    <div className="pb-10">
      <Typography.H6 title="Friend Requests" className="my-5" weight="medium" />

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3 min-h-[10rem]">
        {friendRequests && friendRequests!.length == 0 && (
          <Typography.Span title="No friend request yet." color="muted" />
        )}

        {friendRequests?.map(props => {
          return <FriendRequestCard key={props.id} {...props} />;
        })}
      </div>
    </div>
  );
};

export default FriendRequestList;
