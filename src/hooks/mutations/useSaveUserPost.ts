import { BookmarkService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_BOOKMARKS_KEY } from '../queries/useGetBookmarks';

export default function useSaveUserPost() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationKey: ['SAVE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      return await BookmarkService.saveUserPost(postId);
    },
    onSuccess: async () => {
      await queryCLient.invalidateQueries({
        queryKey: [GET_BOOKMARKS_KEY()],
      });
    },
  });
}
