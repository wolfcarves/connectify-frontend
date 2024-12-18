import React from 'react';
import ChatCard from './ChatCard';
import { Chat as ChatType } from '@/services';

interface ChatProps
  extends Omit<ChatType, 'latest_message' | 'latest_message_at'> {
  latest_message?: string;
  latest_message_at?: string;
  onClick?: () => void;
}

const Chat = ({ avatar, name, latest_message, onClick }: ChatProps) => {
  return (
    <>
      <ChatCard onClick={onClick}>
        <ChatCard.Content
          avatar={avatar}
          name={name}
          content={latest_message}
        />
      </ChatCard>
    </>
  );
};

export default Chat;
