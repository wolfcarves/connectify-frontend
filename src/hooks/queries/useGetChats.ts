import { Chat, ChatService, Pagination } from '@/services';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const GET_CHATS_KEY = () => 'GET_CHATS_KEY';

export type ChatInfiniteData = InfiniteData<
  {
    data: Array<Chat>;
    pagination: Pagination;
  },
  unknown
>;

export default function useGetChats() {
  return useInfiniteQuery({
    queryKey: [GET_CHATS_KEY()],
    queryFn: async ({ pageParam }) => {
      const response = await ChatService.getChats({
        page: pageParam,
      });

      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
