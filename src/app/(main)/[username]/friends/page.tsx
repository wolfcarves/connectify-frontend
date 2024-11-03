import FriendList from '@/features/friends/list/FriendList';

const UserProfileFriendsPage = ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = params;

  return (
    <>
      <FriendList username={username} />
    </>
  );
};

export default UserProfileFriendsPage;
