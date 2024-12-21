import { ChatService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const GET_CHAT_MESSAGES_KEY = () => 'GET_CHAT_MESSAGES_KEY';
export default function useGetChatMessages({
  chatId,
  page,
  perPage,
}: {
  chatId: number;
  page?: number;
  perPage?: number;
}) {
  return useInfiniteQuery({
    queryKey: [GET_CHAT_MESSAGES_KEY(), chatId, page, perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ChatService.getChatMessages({
        chatId,
        page: pageParam,
        perPage: 20,
      });

      return response;
    },
    enabled: !!chatId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.remaining_items > 0
        ? pages.length + 1
        : undefined;
    },
  });
}
