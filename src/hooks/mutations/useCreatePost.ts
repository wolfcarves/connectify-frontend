import { CreatePostInput, PostService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { GET_ALL_USER_POSTS_KEY } from '../queries/useGetAllUserPosts';

export default function useCreatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (data: CreatePostInput) => {
      const formData = new FormData();

      data?.images.forEach((image: File) => {
        formData.append('images', image);
      });

      formData.append('content', data.content);
      formData.append('audience', data.audience as string);

      const response = await PostService.postCreatePost(data);

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_ALL_USER_POSTS_KEY()],
      });

      toast({
        title: 'Your post is now published',
      });

      router.push('/');
    },
  });
}
