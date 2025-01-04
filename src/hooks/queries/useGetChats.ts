import { ChatService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_CHATS_KEY = () => 'GET_CHATS_KEY';

export default function useGetChats() {
  return useQuery({
    queryKey: [GET_CHATS_KEY()],
    queryFn: async () => {
      const response = await ChatService.getChats({});
      return response;
    },
  });
}
