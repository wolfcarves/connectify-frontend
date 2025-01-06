import { ChatInfiniteData, GET_CHATS_KEY } from '@/hooks/queries/useGetChats';
import { useQueryClient } from '@tanstack/react-query';
import { Chat as ChatType } from '@/services';

const useOptimisticUpdateChats = () => {
  const queryClient = useQueryClient();

  // To put the latest message to the top of the chat list
  const optimiticUpdateChatOrder = ({
    chatId,
    latestMessage,
  }: {
    chatId: number;
    latestMessage: string;
  }) => {
    const queryKey = [GET_CHATS_KEY()];
    const baseState = queryClient.getQueryData(queryKey);

    if (baseState) {
      queryClient.setQueryData(queryKey, (previousState: ChatInfiniteData) => {
        let movedChat;

        const updatedPages = previousState.pages.map(page => {
          const filteredData = page.data.filter(chat => {
            if (chat.id === chatId) {
              movedChat = {
                ...chat,
                latest_message: latestMessage,
                latest_message_at: 'Just now',
              } as ChatType;

              return false;
            }

            return true;
          });

          return { ...page, data: filteredData };
        });

        if (movedChat) {
          updatedPages[0] = {
            ...updatedPages[0],
            data: [movedChat, ...updatedPages[0].data],
          };
        }

        return {
          ...previousState,
          pages: updatedPages,
        };
      });
    }
  };

  const optimiticUpdateChatReadStatus = async (
    chatId: number,
    status: boolean,
  ) => {
    const queryKey = [GET_CHATS_KEY()];
    await queryClient.cancelQueries({ queryKey });

    const baseState = queryClient.getQueryData(queryKey);

    if (baseState) {
      queryClient.setQueryData(queryKey, (previousState: ChatInfiniteData) => {
        const updatedPages = previousState.pages.map(page => {
          const updated = page.data.map(chat => {
            if (chat.id === chatId) {
              return {
                ...chat,
                is_read: status,
              };
            }

            return chat;
          });

          return {
            ...page,
            data: updated,
          };
        });

        return {
          ...previousState,
          pages: updatedPages,
        };
      });
    }
  };

  return { optimiticUpdateChatOrder, optimiticUpdateChatReadStatus };
};

export default useOptimisticUpdateChats;
