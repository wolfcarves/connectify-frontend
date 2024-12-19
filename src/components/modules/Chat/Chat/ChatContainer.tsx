import React, { ComponentProps } from 'react';

interface ChatContainerProps extends ComponentProps<'div'> {}

const ChatContainer = ({ ...props }: ChatContainerProps) => {
  return <div {...props} />;
};

export default ChatContainer;
