import React from 'react';
import ChatMessage from './ChatMessage';
import useGetChat from '@/hooks/queries/useGetChat';
import Spinner from '@/components/ui/spinner';

interface ChatMessagesProps {
  chatId?: number;
  onBackClick?: () => void;
}

const ChatMessages = ({ chatId, onBackClick }: ChatMessagesProps) => {
  const [message, setMessage] = React.useState<string>('');

  const { data: chatDetails, isPending: isChatPending } = useGetChat({
    chatId: chatId!,
  });

  const handleSendMessage = () => {
    console.log('Send message');
  };

  if (isChatPending)
    return (
      <ChatMessage className="flex justify-center items-center h-full">
        <Spinner />
      </ChatMessage>
    );

  return (
    <ChatMessage className="flex flex-col h-full">
      <ChatMessage.Header name={chatDetails?.name} onBackClick={onBackClick} />
      <ChatMessage.Body>
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
        <ChatMessage.Item
          isMessageOwn={true}
          message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident magni laudantium unde illo nihil cupiditate esse magnam, deserunt eum adipisci."
        />
        <ChatMessage.Item
          isMessageOwn={false}
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem?"
        />
      </ChatMessage.Body>

      <ChatMessage.Input
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </ChatMessage>
  );
};

export default ChatMessages;
