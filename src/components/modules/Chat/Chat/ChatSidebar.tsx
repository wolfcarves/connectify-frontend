'use client';

import React, { ComponentProps, ReactNode, useCallback, useState } from 'react';
import Chats from './Chats';
import Card from '@/components/common/Card/Card';
import ChatMessages from '../ChatMessage/ChatMessages';

const ChatSidebar = () => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number>();

  const handleChatClick = useCallback((chatId: number) => {
    setChatId(chatId);
    setIsChatWindowOpen(true);
  }, []);

  return (
    <Card
      className="relative h-max py-2 overflow-hidden"
      style={{ paddingInline: '0px' }}
    >
      <ChatSidebarCarousel index={isChatWindowOpen ? 1 : 0}>
        <ChatSidebarCarouselItem>
          <Chats onChatClick={handleChatClick} />
        </ChatSidebarCarouselItem>

        <ChatSidebarCarouselItem>
          <ChatMessages chatId={chatId} onBackClick={setIsChatWindowOpen} />
        </ChatSidebarCarouselItem>
      </ChatSidebarCarousel>
    </Card>
  );
};

const ChatSidebarCarousel = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  return (
    <div
      className="flex duration-200"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {children}
    </div>
  );
};

interface ChatSidebarCarouselItemProps extends ComponentProps<'div'> {
  children: ReactNode;
}

const ChatSidebarCarouselItem = ({
  children,
  className,
}: ChatSidebarCarouselItemProps) => {
  return (
    <div className={`min-w-full max-h-[calc(100vh-20rem)] px-3 ${className}`}>
      {children}
    </div>
  );
};

export default ChatSidebar;
