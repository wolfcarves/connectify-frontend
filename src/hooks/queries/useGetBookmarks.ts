import { BookmarkService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_BOOKMARKS_KEY = () => 'GET_BOOKMARKS_KEY';

interface IQueryParams {
  page?: number;
  per_page?: number;
}

export default function useGetBookmarks(
  { page, per_page }: IQueryParams = { page: 1, per_page: 20 },
) {
  return useQuery({
    queryKey: [GET_BOOKMARKS_KEY(), page, per_page],
    queryFn: async () => {
      const response = await BookmarkService.getBookmarks({
        page,
        per_page,
      });

      return response.data;
    },
  });
}
