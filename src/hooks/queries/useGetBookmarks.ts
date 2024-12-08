import { BookmarkService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_BOOKMARKS_KEY = () => 'GET_BOOKMARKS_KEY';

interface IQueryParams {
  page?: number;
  perPage?: number;
}

export default function useGetBookmarks(
  { page, perPage }: IQueryParams = { page: 1, perPage: 20 },
) {
  return useQuery({
    queryKey: [GET_BOOKMARKS_KEY(), page, perPage],
    queryFn: async () => {
      const response = await BookmarkService.getBookmarks({
        page,
        perPage,
      });

      return response.data;
    },
  });
}
