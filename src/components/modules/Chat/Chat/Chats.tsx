'use client';

import { useEffect, useState } from 'react';
import Chat from '@/components/modules/Chat/Chat/Chat';
import ChatContainer from '@/components/modules/Chat/Chat/ChatContainer';
import useGetChats from '@/hooks/queries/useGetChats';
import Typography from '@/components/ui/typography';
import { User } from '@/services';
import ChatSkeleton from '@/components/modules/Chat/Chat/ChatSkeleton';
import useCreateChat from '@/hooks/mutations/useCreateChat';
import socket from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { MdOpenInNew } from 'react-icons/md';
import { useSocketStatusStore } from '@/store/useSocketStatusStore';
import { ChatMessage as ChatMessageType } from '@/services';
import ScrollContainer from '@/containers/ScrollContainer';

interface ChatsProps {
  // eslint-disable-next-line no-unused-vars
  onChatClick?: (chatId: number) => void;
}

const Chats = ({ onChatClick }: ChatsProps) => {
  const { isSocketConnected } = useSocketStatusStore();
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [isResultsLoading, setIsResultLoading] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number>();

  const { data: chats, isPending: isChatsPending } = useGetChats();
  const { mutateAsync: createChat } = useCreateChat();

  const handleInitiateChat = async (recipientId: number) => {
    const chatId = await createChat(recipientId);
    setChatId(chatId);
    onChatClick?.(chatId);
  };

  const handleChatClick = (chatId: number) => {
    setChatId(chatId);
    onChatClick?.(chatId);
  };

  useEffect(() => {
    socket.on('receive_message', (data: ChatMessageType) => {
      if (chats?.data) {
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    if (chatId && isSocketConnected) socket.emit('join_chat', String(chatId));
  }, [chatId, isSocketConnected]);

  return (
    <ChatContainer>
      <Chat.Header>
        <div className="flex justify-between items-center">
          <Typography.H5 title="Messages" weight="bold" />
          <Button
            variant="ghost"
            icon={<MdOpenInNew size={18} />}
            size="sm"
            className="h-max p-2"
          />
        </div>

        <Chat.Search
          onResultChange={(data, isLoading) => {
            setHasResults(data?.length > 0);
            setSearchResults(data);
            setIsResultLoading(isLoading);
          }}
          onSearchTextChange={setSearch}
        />
      </Chat.Header>

      {search && !isResultsLoading && (
        <div className="px-2">
          <Typography.Span
            title={hasResults ? `Results for "${search}"` : 'No result'}
            color="muted"
            size="sm"
          />
        </div>
      )}

      {(isChatsPending || isResultsLoading) && search && (
        <ChatSkeleton count={5} />
      )}

      <ScrollContainer enableScroll className="px-3">
        {searchResults?.map(user => {
          return (
            <Chat.User
              key={user?.id}
              id={user.id}
              user_id={user.id}
              avatar={user.avatar}
              name={user.name}
              onClick={() => handleInitiateChat(user?.id)}
            />
          );
        })}

        {!search &&
          chats?.data?.map(chat => {
            return (
              <Chat.User
                key={chat?.id}
                {...chat}
                onClick={() => handleChatClick(chat?.id)}
              />
            );
          })}
      </ScrollContainer>
    </ChatContainer>
  );
};

export default Chats;
