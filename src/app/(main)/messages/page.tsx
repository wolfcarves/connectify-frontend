import Avatar from '@/components/common/Avatar/Avatar';
import User from '@/components/common/User';
import Typography from '@/components/ui/typography';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const MessagesPage = () => {
  return (
    <div className="flex">
      <Typography.H6
        title="Click a friend on the right to start chatting!"
        className="my-64 mx-auto"
        color="muted"
      />
    </div>
  );
};

export default withAuthGuard(MessagesPage);
