import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import useGetChat from '@/hooks/queries/useGetChat';
import Spinner from '@/components/ui/spinner';
import useGetChatMessages from '@/hooks/queries/useGetChatMessages';
import { ChatMessage as ChatMessageType } from '@/services';
import useSession from '@/hooks/useSession';
import socket from '@/lib/socket';
import { useIntersection } from '@mantine/hooks';
import { useVirtualizer } from '@tanstack/react-virtual';
import VirtualList from '@/components/common/VirtualList/VirtualList';

interface ChatMessagesProps {
  chatId?: number;
  onBackClick?: () => void;
}

const getItemKey = (item: ChatMessageType) => item.id;

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

  const messages = chatMessages?.pages.flatMap(p => p.data);

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

  console.log(messages?.length);

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
      <ChatMessage.Body className="w-[380px] h-[580px] overflow-y-auto contain-strict">
        {/* {localChatMessages
          ?.map(message => (
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
          ))
          .reverse()} */}

        <VirtualList
          items={messages ?? []}
          getItemKey={getItemKey}
          estimateSize={() => 100}
          // listener={() => <div className="bg-red-500 h-10 w-full" />}
          renderItem={item => (
            <div
              style={{
                padding: '5px',
                border: '1px solid orange',
              }}
            >
              {item.content}
            </div>
          )}
        />

        {/* <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map(virtualRow => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
              >
                <div style={{ padding: '10px 0' }}>
                  <div>Row {virtualRow.index}</div>
                  <div>{virtualRow.index}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </ChatMessage.Body>
      <ChatMessage.Input
        chatId={chatId}
        onSubmit={data => setLocalChatMessages(prev => [...prev, data])}
      />
    </ChatMessage>
  );
};

/*
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
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
*/

export default ChatMessages;
