import UserProfileImage from '@/features/user/image/UserProfileImage';
import UserProfilePosts from '@/features/user/tabs/UserProfilePosts';
import getQueryClient from '@/lib/getQueryClient';
import { AuthenticationService } from '@/services';
import { OpenAPI } from '@/services/core/OpenAPI';
import { cookies } from 'next/headers';

const UserProfilePage = async ({
  params,
}: {
  params: { userId?: string; username?: string };
}) => {
  // const authCookie = cookies().get('auth_session');

  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: [GET_CURRENT_SESSION_KEY()],
  //   queryFn: async () => {
  //     OpenAPI.HEADERS = {
  //       cookie: 'test',
  //     };
  //     const response = await AuthenticationService.useGetCurrentSession();

  //     return response;
  //   },
  // });

  return (
    <>
      <UserProfileImage />
      <UserProfilePosts userId={Number(params.userId)} />
    </>
  );
};

export default UserProfilePage;
