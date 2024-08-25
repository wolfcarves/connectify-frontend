import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthenticationService, UserLoginInput } from '@/services';
import { useRouter } from 'next/navigation';

export default function useLoginUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['LOGIN_USER_KEY'],
    mutationFn: async (data: UserLoginInput) => {
      const response = await AuthenticationService.postLoginUser(data);

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['GET_CURRENT_SESSION'],
      });

      router.push('/');
    },
  });
}
