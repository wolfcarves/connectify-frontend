import { BookmarkService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_BOOKMARKS_KEY } from '../queries/useGetBookmarks';

export default function useUnSaveUserPost() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationKey: ['UNSAVE_USER_POST_KEY'],
    mutationFn: async (postId: number) => {
      return await BookmarkService.unSaveUserPost(postId);
    },
    onSuccess: async () => {
      await queryCLient.invalidateQueries({
        queryKey: [GET_BOOKMARKS_KEY()],
      });
    },
  });
}
