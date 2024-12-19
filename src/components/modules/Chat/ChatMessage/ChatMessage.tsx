import React, { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { IoArrowBackOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { HiPaperAirplane } from 'react-icons/hi2';
import Typography from '@/components/ui/typography';
import Avatar from '@/components/common/Avatar/Avatar';
import useSession from '@/hooks/useSession';

const ChatMessage = (props: ComponentProps<'div'>) => {
  return <div {...props} />;
};

interface ChatMessageHeaderProps {
  name?: string;
  onBackClick?: () => void;
}

const ChatMessageHeader = ({ name, onBackClick }: ChatMessageHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center gap-x-2">
        <Button
          size="icon"
          icon={<IoArrowBackOutline />}
          variant="ghost"
          onClick={onBackClick}
        />
        <div className="pb-0.5">
          <Typography.Span title={name} />
        </div>
      </div>

      <Button size="icon" icon={<BsThreeDots />} variant="ghost" />
    </div>
  );
};

const ChatMessageBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col w-full space-y-4 px-3 py-2.5 overflow-auto">
      {children}
    </div>
  );
};

interface ChatMessageItemProps {
  isMessageOwn: boolean;
  message: string;
}

const ChatMessageItem = ({ isMessageOwn, message }: ChatMessageItemProps) => {
  const session = useSession();

  return (
    <div className={`flex gap-x-2 ${isMessageOwn && 'flex-row-reverse'}`}>
      <Avatar src={session.avatar} size="sm" />

      <div className="h-max max-w-56 bg-muted rounded-xl px-2.5 py-1">
        <Typography.P title={message} />
      </div>
    </div>
  );
};

interface ChatMessageInputProps {
  message: string;
  setMessage: (value: string) => void;
  handleSendMessage: () => void;
}

const ChatMessageInput = ({
  message,
  setMessage,
  handleSendMessage,
}: ChatMessageInputProps) => {
  return (
    <div className="flex items-center border-t p-2">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border rounded-full outline-none px-3 py-2"
      />

      <Button
        size="icon"
        icon={<HiPaperAirplane />}
        variant="ghost"
        onClick={handleSendMessage}
      />
    </div>
  );
};

ChatMessage.Header = ChatMessageHeader;
ChatMessage.Body = ChatMessageBody;
ChatMessage.Item = ChatMessageItem;
ChatMessage.Input = ChatMessageInput;

export default ChatMessage;
