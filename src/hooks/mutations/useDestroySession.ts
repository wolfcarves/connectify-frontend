import { AuthenticationService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function useDestroySession() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['DESTROY_USER_SESSION'],
    mutationFn: async () => {
      const response = await AuthenticationService.deleteCurrentSession();

      return response;
    },
    onSuccess: async () => {
      toast({
        title: 'Logout successful',
        description: 'Hope to see you again motherfucker.',
      });
      router.replace('/login');
      router.refresh();
    },
  });
}
