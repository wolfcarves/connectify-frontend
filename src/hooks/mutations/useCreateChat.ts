import { ChatService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreateChat() {
  return useMutation({
    mutationKey: ['CREATE_CHAT_KEY'],
    mutationFn: async (recipientId: number) => {
      const response = ChatService;
    },
  });
}
