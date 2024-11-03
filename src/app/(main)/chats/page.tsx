import ChatList from '@/features/chats/ChatList';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const MessagesPage = () => {
  return (
    <div>
      <ChatList />
    </div>
  );
};

export default withAuthGuard(MessagesPage);
