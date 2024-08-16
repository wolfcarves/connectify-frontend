import { withAuthGuard } from '@/higher-order/withAuthGuard';

const MessagesPage = () => {
  return <div>MessagesPage</div>;
};

export default withAuthGuard(MessagesPage);
