import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import useGetChat from '@/hooks/queries/useGetChat';
import Spinner from '@/components/ui/spinner';
import useGetChatMessages from '@/hooks/queries/useGetChatMessages';
import { ChatMessage as ChatMessageType } from '@/services';
import useSession from '@/hooks/useSession';
import socket from '@/lib/socket';
import { useIntersection } from '@mantine/hooks';

interface ChatMessagesProps {
  chatId?: number;
  onBackClick?: () => void;
}

const ChatMessages = ({ chatId, onBackClick }: ChatMessagesProps) => {
  const session = useSession();

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
  });

  const listenerRef = useRef<HTMLDivElement>(null);

  const { ref: intersectionRef, entry } = useIntersection({
    root: listenerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    socket.on('receive_message', (data: ChatMessageType) => {
      setLocalChatMessages(prev => [...prev, { ...data }]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  if (isChatPending)
    return (
      <ChatMessage>
        <ChatMessage.Header name="" onBackClick={onBackClick} />
        <ChatMessage.Body center>
          <Spinner />
        </ChatMessage.Body>
      </ChatMessage>
    );

  return (
    <ChatMessage>
      <ChatMessage.Header name={chatDetails?.name} onBackClick={onBackClick} />
      <ChatMessage.Body>
        {localChatMessages
          ?.map(message => {
            if (message.chat_id === chatId)
              return (
                <ChatMessage.Item
                  key={message.id}
                  avatar={
                    message.sender_id === session.userId
                      ? session.avatar
                      : chatDetails?.avatar
                  }
                  isMessageOwn={message.sender_id === session.userId}
                  message={message.content}
                />
              );
          })
          .reverse()}

        {chatMessages?.pages.map((page, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {page.data.map(message => (
              <ChatMessage.Item
                key={message.id}
                avatar={
                  message.sender_id === session.userId
                    ? session.avatar
                    : chatDetails?.avatar
                }
                isMessageOwn={message.sender_id === session.userId}
                message={message.content}
              />
            ))}
          </React.Fragment>
        ))}

        <div ref={intersectionRef} />

        {hasNextPage && isFetchingNextPage && (
          <div className="flex justify-center items-center py-2">
            <Spinner />
          </div>
        )}
      </ChatMessage.Body>
      <ChatMessage.Input
        chatId={chatId}
        onSubmit={data => setLocalChatMessages(prev => [...prev, data])}
      />
    </ChatMessage>
  );
};

export default ChatMessages;
