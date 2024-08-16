import CreatePostForm from '@/features/feed/forms/CreatePostForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const CreatePostPage = () => {
  return (
    <>
      <CreatePostForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
