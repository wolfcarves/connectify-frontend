import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfilePosts from '@/features/user/tabs/UserProfilePosts';

const UserProfilePage = async ({
  params,
}: {
  params: { userId?: string; username?: string };
}) => {
  return (
    <>
      <UserProfileImage />
      <UserProfilePosts userId={Number(params.userId)} />
    </>
  );
};

export default UserProfilePage;
