import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { IoIosPaperPlane, IoMdArrowRoundBack } from 'react-icons/io';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import useSendChatMessage from '@/hooks/mutations/useSendChatMessage';
import useGetUserProfile from '@/hooks/queries/useGetUserProfile';

const ChatBox = ({
  userId,
  roomId,
  onBackClick,
}: {
  userId?: number;
  roomId?: string;
  onBackClick: () => void;
}) => {
  const { data: user } = useGetUserProfile({ userId });

  const session = useSession();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const isMessageOwn = useMemo(
    () => (session?.userId === userId ? session.avatar : user?.avatar),
    [userId],
  );

  const { mutateAsync: sendMessage } = useSendChatMessage();

  const handleSendMessage = async () => {
    if (message !== undefined || !userId) {
      setMessage('');
    }
  };

  useEffect(() => {
    if (roomId) socket.emit('join_room', roomId);
  }, [roomId]);

  useEffect(() => {
    socket.on('receive_message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  return (
    <>
      <div className="flex gap-x-2 items-center border-b px-2.5 py-1.5">
        <Button
          size="icon"
          icon={<IoMdArrowRoundBack size={20} />}
          variant="ghost"
          onClick={onBackClick}
        />

        <Typography.Span title={user?.name} />
      </div>

      <div className="flex flex-1 flex-col w-full space-y-4 p-2 overflow-auto">
        {messages.map(message => {
          return (
            <div key={message} className="flex gap-x-2 pe-24">
              <Avatar src={isMessageOwn} size="sm" />
              <div className="h-max bg-muted rounded-xl px-2.5 py-1.5">
                <Typography.P title={message} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center min-h-14 border-t w-full">
        <input
          className="flex flex-1 h-full bg-transparent focus:border-0 focus:outline-none px-4"
          placeholder="Send message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <Button
          variant="secondary"
          size="sm"
          icon={<IoIosPaperPlane size={16} />}
          className="rounded-xl mx-2"
          onClick={handleSendMessage}
        />
      </div>
    </>
  );
};

export default ChatBox;
