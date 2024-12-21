import { ChatService, ChatSendMessageInput } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useSendChatMessage() {
  return useMutation({
    mutationKey: ['SEND_CHAT_MESSAGE_KEY'],
    mutationFn: async ({
      chatId,
      data,
    }: {
      chatId: number;
      data: ChatSendMessageInput;
    }) => {
      const response = await ChatService.postChatSendMessage({
        chatId,
        requestBody: data,
      });

      return {
        messageId: response.data.messageId,
      };
    },
  });
}
