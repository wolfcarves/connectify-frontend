import UserProfileFriendList from '@/features/username/friends/UserProfileFriendList';

interface Params {
  username: string;
}

interface UserProfileFriendsPageProps {
  params: Promise<Params>;
}

const UserProfileFriendsPage = async ({
  params,
}: UserProfileFriendsPageProps) => {
  const { username } = await params;

  return (
    <>
      <UserProfileFriendList username={username} />
    </>
  );
};

export default UserProfileFriendsPage;
