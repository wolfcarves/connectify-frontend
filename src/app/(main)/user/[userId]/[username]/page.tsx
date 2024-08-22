import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfilePosts from '@/features/user/tabs/UserProfilePosts';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const UserProfilePage = async ({
  params,
}: {
  params: { userId?: string; username?: string };
}) => {
  return (
    <>
      <UserProfileImage userId={Number(params.userId)} />
      <UserProfilePosts userId={Number(params.userId)} />
    </>
  );
};

export default withAuthGuard(UserProfilePage);
