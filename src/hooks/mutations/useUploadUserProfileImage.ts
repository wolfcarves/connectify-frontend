import { UserService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CURRENT_SESSION_KEY } from '../queries/useGetCurrentSession';
import { GET_USER_PROFILE_KEY } from '../queries/useGetUserProfile';

export default function useUploadUserProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['UPLOAD_USER_PROFILE_IMAGE'],
    mutationFn: async (data: FormData) => {
      const response = await UserService.postUploadUserProfileImage({
        avatar: data.get('avatar'),
      });

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CURRENT_SESSION_KEY()],
      });

      await queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_KEY()],
      });
    },
  });
}
