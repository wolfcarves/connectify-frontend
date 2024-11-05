import FriendRequestList from '@/features/friends/FriendRequestList';
import FriendSuggestionList from '@/features/friends/FriendSuggestionList';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const FriendsPage = () => {
  return (
    <>
      <FriendRequestList />
      <FriendSuggestionList />
    </>
  );
};

export default withAuthGuard(FriendsPage);
