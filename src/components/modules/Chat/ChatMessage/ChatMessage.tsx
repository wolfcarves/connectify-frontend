import React, {
  ReactNode,
  ComponentProps,
  forwardRef,
  memo,
  useEffect,
  useRef,
} from 'react';
import { Button } from '@/components/ui/button';
import { IoArrowBackOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { HiPaperAirplane } from 'react-icons/hi2';
import Typography from '@/components/ui/typography';
import Avatar from '@/components/common/Avatar/Avatar';
import useSession from '@/hooks/useSession';
import useSendChatMessage from '@/hooks/mutations/useSendChatMessage';
import { ChatMessage as ChatMessageType } from '@/services';
import socket from '@/lib/socket';

const ChatMessage = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={`flex flex-col h-full ${className}`} {...props} />;
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

interface ChatMessageBodyProps extends ComponentProps<'div'> {
  children: ReactNode;
  center?: boolean;
}

const ChatMessageBody = forwardRef<HTMLDivElement, ChatMessageBodyProps>(
  ({ children, center, ...props }: ChatMessageBodyProps, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-1 flex-col-reverse w-full px-3 py-2.5 overflow-auto ${center && 'justify-center items-center '}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatMessageBody.displayName = 'ChatMessageBody';

interface ChatMessageItemProps {
  avatar?: string;
  message: string;
  isMessageOwn: boolean;
}

const ChatMessageItem = memo(
  ({ avatar, message, isMessageOwn }: ChatMessageItemProps) => {
    return (
      <div
        className={`flex gap-x-2 ${isMessageOwn && 'flex-row-reverse'} py-2`}
      >
        <Avatar src={avatar} size="sm" />
        <div className="h-max max-w-56 bg-muted rounded-xl px-2.5 py-1.5">
          <Typography.P title={message} />
        </div>
      </div>
    );
  },
);

ChatMessageItem.displayName = 'ChatMessageItem';

interface ChatMessageInputProps {
  chatId?: number;
  onSubmit?: (data: ChatMessageType) => void;
}

const ChatMessageInput = ({ chatId, onSubmit }: ChatMessageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { userId } = useSession();
  const { mutateAsync: sendMessage, isPending: isSendMessageLoading } =
    useSendChatMessage();

  const handleSendMessage = async () => {
    try {
      if (chatId && inputRef.current) {
        const content = inputRef.current.value;

        const { messageId } = await sendMessage({ chatId, data: { content } });

        const message: ChatMessageType = {
          id: messageId,
          sender_id: userId!,
          chat_id: chatId,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        socket.emit('send_message', message);
        onSubmit?.(message);
        inputRef.current.value = '';
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    const enterToSubmit = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSendMessage();
      }
    };

    inputRef.current?.addEventListener('keypress', enterToSubmit);

    return () => {
      inputRef.current?.removeEventListener('keypress', enterToSubmit);
    };
  }, []);

  return (
    <div className="flex items-center border-t p-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-transparent border rounded-full outline-none px-3 py-2"
      />

      <Button
        size="icon"
        icon={<HiPaperAirplane />}
        variant="ghost"
        isLoading={isSendMessageLoading}
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
