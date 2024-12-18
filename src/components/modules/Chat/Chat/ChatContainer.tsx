import React, { ComponentProps, ReactNode } from 'react';
import ChatSkeleton from './ChatSkeleton';

interface ChatContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
  isLoading?: boolean;
}

const ChatContainer = ({
  isLoading,
  children,
  ...props
}: ChatContainerProps) => {
  return (
    <div {...props}>{isLoading ? <ChatSkeleton count={10} /> : children}</div>
  );
};

export default ChatContainer;
