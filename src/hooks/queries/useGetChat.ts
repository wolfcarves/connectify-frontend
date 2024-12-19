import { ChatService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_CHAT_KEY = () => 'GET_CHAT_KEY';

export default function useGetChat({ chatId }: { chatId: number }) {
  return useQuery({
    queryKey: [GET_CHAT_KEY(), chatId],
    queryFn: async () => {
      const response = await ChatService.getChat({ chatId });
      return response.data;
    },
    enabled: !!chatId,
  });
}
