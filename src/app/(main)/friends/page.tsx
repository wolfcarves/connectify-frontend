import FriendRequestList from '@/features/friends/list/FriendRequestList';
import FriendSuggestionList from '@/features/friends/list/FriendSuggestionList';
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
