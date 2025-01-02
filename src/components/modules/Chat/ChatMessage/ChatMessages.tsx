import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useQueryClient } from '@tanstack/react-query';

interface ChatMessagesProps {
  chatId?: number;
  onBackClick?: Dispatch<SetStateAction<boolean>>;
}

const ChatMessages = ({ chatId, onBackClick }: ChatMessagesProps) => {
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLElement>(null);
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
  });

  const listenerRef = useRef<HTMLDivElement>(null);

  const { ref: intersectionRef, entry } = useIntersection({
    root: listenerRef.current,
    threshold: 1,
  });

  const handleBackClick = useCallback(async () => {
    onBackClick?.(false);
  }, []);

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: [GET_CHAT_MESSAGES_KEY(), chatId],
      exact: true,
    });
  }, [chatId]);

  useEffect(() => {
    scrollRef?.current?.scrollTo(0, scrollRef?.current?.scrollHeight);

    socket.on('receive_message', (data: ChatMessageType) => {
      setLocalChatMessages(prev => [...prev, { ...data }]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  if (isChatPending)
    return (
      <ChatMessage>
        <ChatMessage.Header name="" onBackClick={() => onBackClick?.(false)} />
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
                  <ChatMessage.Item
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
                <ChatMessage.Item
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

          <div ref={intersectionRef} />

          {hasNextPage && isFetchingNextPage && (
            <div className="flex justify-center items-center py-2">
              <Spinner />
            </div>
          )}
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
