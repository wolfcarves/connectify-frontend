'use client';

import Typography from '@/components/ui/typography';
import useGetFriendSuggestions from '@/hooks/queries/useGetFriendSuggestions';
import FriendCard from '@/components/modules/Friend/FriendCard';
import FriendRequestListSkeleton from '../skeleton/FriendListSkeleton';

const FriendSuggestionList = () => {
  const { data: friendSuggestions, isPending: isFriendSuggestionsLoading } =
    useGetFriendSuggestions();

  if (isFriendSuggestionsLoading) {
    return <FriendRequestListSkeleton title="People you may know" />;
  }

  return (
    <div className="pb-10">
      <Typography.H4
        title="People you may know"
        className="my-5"
        weight="medium"
      />

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3">
        {friendSuggestions?.map(props => {
          return <FriendCard key={props.id} type="suggestion" {...props} />;
        })}
      </div>
    </div>
  );
};

export default FriendSuggestionList;
