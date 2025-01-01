import { AuthenticationService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CURRENT_SESSION_KEY } from '../queries/useGetCurrentSession';
import { useRouter } from 'next/navigation';

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

      router.push('/login');
      window.location.reload();
    },
  });
}
