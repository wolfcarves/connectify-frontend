import { ChatService, SendMessageInput } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useSendChatMessage() {
  return useMutation({
    mutationKey: ['SEND_CHAT_MESSAGE_KEY'],
    mutationFn: async (data: SendMessageInput) => {
      const response = ChatService.postChatSendMessage({ requestBody: data });

      return response;
    },
  });
}
