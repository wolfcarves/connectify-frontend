import { ChatService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const GET_CHATS_KEY = () => 'GET_CHATS_KEY';

interface IQueryParams {
  page?: number;
  perPage?: number;
}

export default function useGetChats(
  { page, perPage }: IQueryParams = { page: 1, perPage: 20 },
) {
  return useQuery({
    queryKey: [GET_CHATS_KEY(), page, perPage],
    queryFn: async () => {
      const response = await ChatService.getChats({
        page,
        perPage,
      });

      return response;
    },
  });
}
