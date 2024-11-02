'use client';

import FriendCard from '@/components/modules/Friend/FriendCard';
import Typography from '@/components/ui/typography';
import useGetFriendList from '@/hooks/queries/useGetFriendList';

const FriendList = () => {
  const { data: friendList } = useGetFriendList(5);

  return (
    <>
      <Typography.H4 title="Friends" weight="semibold" className="my-7" />

      <div className="w-full xs:grid gap-3 space-y-3 xs:space-y-0 xs:grid-cols-2 min-h-[10rem]">
        {friendList?.map(props => <FriendCard key={props.id} {...props} />)}
      </div>
    </>
  );
};

export default FriendList;
