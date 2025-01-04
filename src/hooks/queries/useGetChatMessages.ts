import { ChatMessage, ChatService, Pagination } from '@/services';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export type ChatMessageInfinteData = InfiniteData<
  {
    data: Array<ChatMessage>;
    pagination: Pagination;
  },
  unknown
>;

export const GET_CHAT_MESSAGES_KEY = () => 'GET_CHAT_MESSAGES_KEY';

export default function useGetChatMessages({
  chatId,
  enabled,
}: {
  chatId: number;
  enabled: boolean;
}) {
  return useInfiniteQuery({
    queryKey: [GET_CHAT_MESSAGES_KEY(), chatId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ChatService.getChatMessages({
        chatId,
        page: pageParam,
        perPage: 10,
      });

      return response;
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
    refetchOnReconnect: true,
    refetchOnMount: false,
  });
}
