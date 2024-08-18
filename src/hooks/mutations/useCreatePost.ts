import { CreatePostInput, PostService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function useCreatePost() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (data: CreatePostInput) => {
      const response = await PostService.postCreatePost(data);

      return response;
    },
    onSuccess: () => {
      toast({
        title: 'Your post is now published',
      });

      router.push('/');
    },
  });
}
