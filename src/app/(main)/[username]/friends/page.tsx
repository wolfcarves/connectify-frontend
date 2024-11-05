import UserProfileFriendList from '@/features/username/friends/UserProfileFriendList';

const UserProfileFriendsPage = ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = params;

  return (
    <>
      <UserProfileFriendList username={username} />
    </>
  );
};

export default UserProfileFriendsPage;
