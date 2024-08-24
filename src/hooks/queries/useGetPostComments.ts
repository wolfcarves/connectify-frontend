import { EngagementService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useGetPostComments(postId?: number) {
  return useQuery({
    queryKey: ['GET_POST_COMMENTS', postId],
    queryFn: async () => {
      const response = await EngagementService.getPostComments(postId ?? -1);

      return response.data;
    },
    enabled: !!postId,
  });
}
