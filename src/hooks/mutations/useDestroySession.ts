import { AuthenticationService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GET_CURRENT_SESSION_KEY } from '../queries/useGetCurrentSession';

export default function useDestroySession() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['DESTROY_USER_SESSION_KEY'],
    mutationFn: async () => {
      const response = await AuthenticationService.deleteCurrentSession();
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CURRENT_SESSION_KEY()],
      });

      router.refresh();
      router.replace('/login');
    },
  });
}
