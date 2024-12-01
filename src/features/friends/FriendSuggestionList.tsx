'use client';

import Typography from '@/components/ui/typography';
import useGetFriendSuggestions from '@/hooks/queries/useGetFriendSuggestions';
import FriendListSkeleton from './FriendListSkeleton';
import FriendSuggestionCard from '@/components/modules/Friend/FriendSuggestionCard';

const FriendSuggestionList = () => {
  const { data: friendSuggestions, isPending: isFriendSuggestionsLoading } =
    useGetFriendSuggestions();

  if (isFriendSuggestionsLoading) {
    return <FriendListSkeleton title="People you may know" />;
  }

  return (
    <div className="pb-10">
      <Typography.H6
        title="People you may know"
        className="my-5"
        weight="medium"
      />
      {friendSuggestions?.length === 0 && (
        <Typography.Span
          title="No suggestions for now"
          className="my-5"
          color="muted"
        />
      )}

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3 mt-6">
        {friendSuggestions?.map(props => {
          return <FriendSuggestionCard key={props.id} {...props} />;
        })}
      </div>
    </div>
  );
};

export default FriendSuggestionList;
