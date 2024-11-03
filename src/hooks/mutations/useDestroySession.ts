import { AuthenticationService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useDestroySession() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['DESTROY_USER_SESSION'],
    mutationFn: async () => {
      const response = await AuthenticationService.deleteCurrentSession();
      return response;
    },
    onSuccess: async () => {
      router.refresh();
      router.replace('/login');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
}
