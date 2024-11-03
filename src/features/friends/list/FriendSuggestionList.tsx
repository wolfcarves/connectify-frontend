'use client';

import Typography from '@/components/ui/typography';
import useGetFriendSuggestions from '@/hooks/queries/useGetFriendSuggestions';
import FriendRequestListSkeleton from '../skeleton/FriendListSkeleton';
import FriendSuggestionCard from '@/components/modules/Friend/FriendSuggestionCard';

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

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3 mt-6">
        {friendSuggestions?.map(props => {
          return <FriendSuggestionCard key={props.id} {...props} />;
        })}
      </div>
    </div>
  );
};

export default FriendSuggestionList;
