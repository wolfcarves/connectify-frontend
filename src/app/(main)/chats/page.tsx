import ChatList from '@/features/chats/ChatList';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const MessagesPage = () => {
  return (
    <>
      <ChatList />
    </>
  );
};

export default withAuthGuard(MessagesPage);
