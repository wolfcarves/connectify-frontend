import { AuthenticationService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_CURRENT_SESSION_KEY } from '../queries/useGetCurrentSession';
import { useRouter } from 'next/navigation';

export default function useDestroySession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['DESTROY_SESSION'],
    mutationFn: async () => {
      const response = await AuthenticationService.deleteCurrentSession();

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_CURRENT_SESSION_KEY()],
      });

      window.location.reload();
    },
  });
}
