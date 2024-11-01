'use client';

import Typography from '@/components/ui/typography';
import useGetFriendSuggestions from '@/hooks/queries/useGetFriendSuggestions';

import FriendCard from '@/components/modules/Card/FriendCard';

const FriendSuggestionList = () => {
  const { data: friendSuggestions, isPending: isFriendSuggestionsLoading } =
    useGetFriendSuggestions();

  return (
    <div className="pb-10">
      <Typography.H4 title="Find Friends" className="my-5" weight="medium" />

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3">
        {friendSuggestions?.map(props => {
          return (
            <FriendCard
              key={props.id}
              isLoading={isFriendSuggestionsLoading}
              {...props}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendSuggestionList;
