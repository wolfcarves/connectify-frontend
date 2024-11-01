import CreatePostForm from '@/features/post/form/CreatePostForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const CreatePostPage = () => {
  return (
    <>
      <CreatePostForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
