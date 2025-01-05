'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
import Spinner from '@/components/ui/spinner';
import { useIntersection } from '@mantine/hooks';
import useOptimisticUpdateChats from '@/hooks/modules/chats/useOptimisticUpdateChats';

interface ChatsProps {
  // eslint-disable-next-line no-unused-vars
  onChatClick?: (chatId: number) => void;
  isChatWindowOpen: boolean;
}

const Chats = ({ isChatWindowOpen, onChatClick }: ChatsProps) => {
  const isChatWindowOpenRef = useRef<boolean>(isChatWindowOpen);
  const listenerRef = useRef<HTMLDivElement>(null);

  const { isSocketConnected } = useSocketStatusStore();
  const { optimiticUpdateChatOrder, optimiticUpdateChatReadStatus } =
    useOptimisticUpdateChats();
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [isResultsLoading, setIsResultLoading] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number>();

  const {
    data: chats,
    isPending: isChatsPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetChats();

  const _chats = useMemo(
    () => chats?.pages.flatMap(page => page.data),
    [chats],
  );

  const { mutateAsync: createChat } = useCreateChat();

  const { ref: intersectionRef, entry } = useIntersection({
    root: listenerRef.current,
    threshold: 1,
  });

  const handleInitiateChat = async (recipientId: number) => {
    const chatId = await createChat(recipientId);
    setChatId(chatId);
    onChatClick?.(chatId);
  };

  const handleChatClick = async (chatId: number) => {
    setChatId(chatId);
    onChatClick?.(chatId);
    await optimiticUpdateChatReadStatus(chatId, true);
  };

  useEffect(() => {
    isChatWindowOpenRef.current = isChatWindowOpen;
  }, [isChatWindowOpen]);

  useEffect(() => {
    const handleReceiveMessage = async (data: ChatMessageType) => {
      optimiticUpdateChatOrder({
        chatId: data?.chat_id,
        latestMessage: data.content,
      });

      console.log(isChatWindowOpenRef.current);

      await optimiticUpdateChatReadStatus(
        data?.chat_id,
        isChatWindowOpenRef.current,
      );
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [optimiticUpdateChatOrder, optimiticUpdateChatReadStatus]);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

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

      {search === '' && _chats === undefined && !isChatsPending ? (
        <div className="text-center mt-10 px-2">
          <Typography.Span
            title="Initiate a chat by searching people above!"
            className="text-center mx-auto"
            color="muted"
          />
        </div>
      ) : null}

      {search && !isResultsLoading && (
        <div className="px-2">
          <Typography.Span
            title={hasResults ? `Results for "${search}"` : 'No result'}
            color="muted"
            size="sm"
          />
        </div>
      )}

      <div className="px-3">
        {(isChatsPending || isResultsLoading) && search && (
          <ChatSkeleton count={5} />
        )}
      </div>

      <ScrollContainer enableScroll className="px-3 pb-5">
        {searchResults?.map(user => {
          return (
            <Chat.User
              key={user?.id}
              id={user.id}
              user_id={user.id}
              avatar={user.avatar}
              name={user.name}
              is_read={true}
              onClick={() => handleInitiateChat(user?.id)}
            />
          );
        })}

        {!search &&
          _chats?.map(chat => {
            return (
              <Chat.User
                key={chat?.id}
                {...chat}
                onClick={() => handleChatClick(chat?.id)}
              />
            );
          })}

        <div ref={intersectionRef} />

        {hasNextPage && isFetchingNextPage && (
          <div className="flex justify-center contents-center py-2">
            <Spinner />
          </div>
        )}
      </ScrollContainer>
    </ChatContainer>
  );
};

export default Chats;
