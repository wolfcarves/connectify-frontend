import CreatePostForm from '@/features/post/CreatePostForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const CreatePostPage = () => {
  return (
    <>
      <CreatePostForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
