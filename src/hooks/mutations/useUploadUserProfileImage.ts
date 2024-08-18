import { UserService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_USER_PROFILE_IMAGE_KEY } from '../queries/useGetUserProfileImage';

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
      queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_IMAGE_KEY()],
      });
    },
  });
}
