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
import useSendChatMessage from '@/hooks/mutations/useSendChatMessage';
import { ChatMessage as ChatMessageType } from '@/services';
import socket from '@/lib/socket';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Input from '@/components/common/Input';

const ChatMessage = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={`flex flex-col h-full ${className}`} {...props} />;
};

interface ChatMessageHeaderProps {
  name?: string;
  onBackClick?: () => void;
}

const ChatMessageHeader = ({ name, onBackClick }: ChatMessageHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b pb-0.5">
      <div className="flex items-center gap-x-2">
        <Button
          size="icon"
          icon={<IoArrowBackOutline size={18} />}
          variant="ghost"
          onClick={onBackClick}
        />
        <div className="pb-0.5">
          <Typography.Span title={name} weight="semibold" />
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
        className={`flex flex-1 flex-col-reverse w-full overflow-auto ${center && 'justify-center items-center '}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatMessageBody.displayName = 'ChatMessageBody';

interface ChatMessageContentProps {
  avatar?: string;
  message: string;
  isMessageOwn: boolean;
}

const ChatMessageContent = memo(
  ({ avatar, message, isMessageOwn }: ChatMessageContentProps) => {
    return (
      <div
        className={`flex gap-x-2 ${isMessageOwn && 'flex-row-reverse'} py-2`}
      >
        <Avatar src={avatar} size="sm" />
        <div className="h-max max-w-56 bg-accent rounded-xl px-2.5 py-1.5">
          <Typography.P title={message} />
        </div>
      </div>
    );
  },
);

ChatMessageContent.displayName = 'ChatMessageContent';

interface ChatMessageInputProps {
  chatId?: number;
  onSubmit?: (data: ChatMessageType) => void;
}

const ChatMessageInput = ({ chatId, onSubmit }: ChatMessageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useGetCurrentSession();
  const { mutateAsync: sendMessage, isPending: isSendMessageLoading } =
    useSendChatMessage();

  const handleSendMessage = async () => {
    try {
      if (chatId && inputRef.current) {
        const content = inputRef.current.value;

        console.log('content', content);

        const { messageId } = await sendMessage({ chatId, data: { content } });

        const message: ChatMessageType = {
          id: messageId,
          sender_id: session?.id!,
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
    const input = inputRef.current;

    const enterToSubmit = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSendMessage();
      }
    };

    input?.addEventListener('keypress', enterToSubmit);

    return () => {
      input?.removeEventListener('keypress', enterToSubmit);
    };
  }, []);

  return (
    <div className="flex gap-x-2 items-center px-0 py-1">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-transparent border rounded-lg outline-none px-3 py-2"
      />

      <Button
        variant="secondary"
        size="icon"
        icon={<HiPaperAirplane />}
        isLoading={isSendMessageLoading}
        onClick={handleSendMessage}
      />
    </div>
  );
};

ChatMessage.Header = ChatMessageHeader;
ChatMessage.Body = ChatMessageBody;
ChatMessage.Content = ChatMessageContent;
ChatMessage.Input = ChatMessageInput;

export default ChatMessage;
