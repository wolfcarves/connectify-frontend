import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import useGetChat from '@/hooks/queries/useGetChat';
import Spinner from '@/components/ui/spinner';
import useGetChatMessages, {
  GET_CHAT_MESSAGES_KEY,
} from '@/hooks/queries/useGetChatMessages';
import { ChatMessage as ChatMessageType } from '@/services';
import socket from '@/lib/socket';
import { useIntersection } from '@mantine/hooks';
import ScrollContainer from '@/containers/ScrollContainer';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import useResetQueryData from '@/hooks/useResetQueryData';

interface ChatMessagesProps {
  chatId?: number;
  onBackClick?: () => void;
}

const ChatMessages = ({ chatId, onBackClick }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLElement>(null);
  const listenerRef = useRef<HTMLDivElement>(null);

  const { resetData } = useResetQueryData();
  const { data: session } = useGetCurrentSession();
  const [localChatMessages, setLocalChatMessages] = useState<ChatMessageType[]>(
    [],
  );

  const { data: chatDetails, isPending: isChatPending } = useGetChat({
    chatId: chatId!,
  });

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatMessages({
    chatId: chatId!,
    enabled: !!chatId,
  });

  const { ref: intersectionRef, entry } = useIntersection({
    root: listenerRef.current,
    threshold: 1,
  });

  const handleBackClick = useCallback(() => {
    resetData({
      queryKey: [GET_CHAT_MESSAGES_KEY(), chatId!],
    });

    onBackClick?.();
  }, [chatId, onBackClick, resetData]);

  useEffect(() => {
    const handleReceiveMessage = (data: ChatMessageType) => {
      setLocalChatMessages(prev => [...prev, { ...data }]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  if (isChatPending || !chatId)
    return (
      <ChatMessage>
        <ChatMessage.Header name="" onBackClick={() => onBackClick?.()} />
        <ChatMessage.Body center>
          <Spinner />
        </ChatMessage.Body>
      </ChatMessage>
    );

  return (
    <ChatMessage>
      <ChatMessage.Header
        name={chatDetails?.name}
        onBackClick={handleBackClick}
      />
      <ChatMessage.Body>
        <ScrollContainer
          ref={scrollRef}
          enableScroll
          className="flex flex-col-reverse px-1"
        >
          {localChatMessages
            ?.map(message => {
              if (message.chat_id === chatId)
                return (
                  <ChatMessage.Content
                    key={message.id}
                    avatar={
                      message.sender_id === session?.id
                        ? session.avatar
                        : chatDetails?.avatar
                    }
                    isMessageOwn={message.sender_id === session?.id}
                    message={message.content}
                  />
                );
            })
            .reverse()}

          {chatMessages?.pages.map((page, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {page.data.map(message => (
                <ChatMessage.Content
                  key={message.id}
                  avatar={
                    message.sender_id === session?.id
                      ? session.avatar
                      : chatDetails?.avatar
                  }
                  isMessageOwn={message.sender_id === session?.id}
                  message={message.content}
                />
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && isFetchingNextPage && (
            <div className="flex justify-center contents-center py-2">
              <Spinner />
            </div>
          )}

          <div ref={intersectionRef} />
        </ScrollContainer>
      </ChatMessage.Body>

      <ChatMessage.Input
        chatId={chatId}
        onSubmit={data => setLocalChatMessages(prev => [...prev, data])}
      />
    </ChatMessage>
  );
};

export default memo(ChatMessages);
