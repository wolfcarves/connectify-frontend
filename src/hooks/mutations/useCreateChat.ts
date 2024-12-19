import { ChatService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreateChat() {
  return useMutation({
    mutationKey: ['CREATE_CHAT_KEY'],
    mutationFn: async (recipientId: number) => {
      const response = await ChatService.postCreateChat({ recipientId });

      return response.data.chat_id;
    },
  });
}
